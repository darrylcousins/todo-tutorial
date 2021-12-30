"use strict";

/** @jsx createElement */

const { createElement, Fragment } = require("@bikeshaving/crank/cjs");
const { renderer } = require("@bikeshaving/crank/cjs/dom");

/**
 * Show toast and set text
 */
const showToast = (text) => {
  const toast = document.getElementById("toast");

  toast.innerHTML = text;
  toast.className = "show";

  setTimeout(function(){ toast.className = toast.className.replace("show", ""); }, 3000);
};

/**
 * Create an editable field for editing task description
 */
function* DescriptionField({id, description, callback}) {

  const valid = true;

  for ({ id, description, callback } of this) {
    yield (
      <input
        class={`mr1 pa2 ba bg-transparent hover-bg-near-white w-100 input-reset br2 ${
          !valid ? "invalid" : ""
        }`}
        value={description}
        id={`input-${id}`}
        onchange={callback}
      />
    );
  };
};

/**
 * Create a DOM representation of tasks fetched from api
 *
 * @generator
 * @yields {Element} DOM element displaying tasks
 */
const ConfirmModal = ({task, callback}) => {
  const callAction = (result) => {
    const modal = document.getElementById('modal');
    modal.style.display = "none";
    callback(result);
  };
  return (
    <div class="modal-content bg-near-white pa3 mw6 br2">
      <div class="container tc">
        <h2>Delete Task</h2>
          <p>Are you sure you want to delete <b>{task.description}</b>?</p>
            <button
              type="button"
              class="pointer br2 bn pv2 ph3 br--left bg-animate bg-dark-blue white hover-bg-navy relative"
              onclick={() => callAction(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              class="pointer br2 bn pv2 ph3 br--right bg-animate border-box bg-red white hover-bg-dark-red relative"
              onclick={() => callAction(true)}
            >
              Delete
            </button>
      </div>
    </div>
  );
};

/**
 * Create a DOM representation of tasks fetched from api
 *
 * @generator
 * @yields {Element} DOM element displaying tasks
 */
function* Tasks() {
  /**
   * True while loading data from api
   *
   * @member {boolean} loading
   */
  let loading = true;
  /**
   * True if error on fetching data
   *
   * @member {boolean} error
   */
  let error = false;
  /**
   * True if adding a task
   *
   * @member {boolean} adding
   */
  let adding = false;
  /**
   * Track which description field is being edited
   *
   * @member {integer} editing
   */
  let editing = null;
  /**
   * The fetched list of tasks
   *
   * @member {array} tasks
   */
  let tasks = [];

  const getTasks = async () => {
    const opts = {
      method: "GET",
    };
    return await fetch("/api", opts)
      .then(async (response) => {
        return await response.json();
      })
      .then((json) => {
        tasks = json;
        loading = false;
        console.log(json);
        this.refresh();
      })
      .catch((err) => {
        error = err.message;
        this.refresh();
      });
  };

  getTasks();

  const addTask = (ev) => {
    adding = true;
    this.refresh();
  };

  const removeTask = async (ev) => {
    const name = ev.target.getAttribute("name");
    const task = tasks.find(el => el.id === parseInt(name));
    const callback = (res) => {
      console.log(res);
      if (res) deleteTask(task.id);
    };
    const props = {task, callback};
    renderer.render(<ConfirmModal {...props} />, document.querySelector("#modal"))
    document.getElementById('modal').style.display="block";
  };

  const deleteTask = async (id) => {
    const url = encodeURI(`/api?id=${id}`);
    const opts = {
      method: "DELETE",
    };
    return await fetch(url, opts)
      .then(async (response) => {
        return await response.json();
      })
      .then((json) => {
        if (json.affectedRows === 1) {
          getTasks();
        };
        showToast("Task deleted");
      })
      .catch((err) => {
        error = err.message;
        this.refresh();
      });
  };

  const markCompletion = (ev) => {
    const {name, checked} = ev.target;
    const task = tasks.find(el => el.id === parseInt(name));
    task.completed = checked;
    updateTask(task);
  };

  const updateTask = async (task) => {
    const opts = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(task),
    };
    return await fetch("/api", opts)
      .then(async (response) => {
        return await response.json();
      })
      .then((json) => {
        if (json.affectedRows === 1) {
          getTasks();
          showToast("Task updated");
        };
      })
      .catch((err) => {
        error = err.message;
        this.refresh();
      });
  };

  const getDescription = (ev) => {
    const description = document.getElementById("description").value;
    if (description) {
      createTask(description);
    };
  };

  const createTask = async (description) => {
    const opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({description}),
    };
    return await fetch("/api", opts)
      .then(async (response) => {
        return await response.json();
      })
      .then((json) => {
        if (json.affectedRows === 1) {
          adding = false;
          loading = false;
          getTasks();
          showToast("Task created");
        };
      })
      .catch((err) => {
        error = err.message;
        this.refresh();
      });
  };

  /**
   * Hide the add form on escape key
   *
   * @function hideForm
   * @param {object} ev Event emitted
   * @listens window.keyup
   */
  const hideAddForm = async (ev) => {
    if (ev.key && ev.key === "Escape") {
      const input = document.getElementById("description");
      if (input) {
        adding = false;
        this.refresh();
      };
    }
  };

  window.document.addEventListener("keyup", hideAddForm);

  /**
   * Restore description after changes or escape key cancellation
   */
  const restoreDescription = async (id) => {
    const task = tasks.find(el => el.id === id);
    const field = document.getElementById(`description-${task.id}`);
    field.innerHTML = task.description;
  };
  /**
   * Editing description
   */
  const editDescription = async (ev) => {
    const id = parseInt(ev.target.id.slice(12));
    if (ev.target.tagName === "INPUT") {
      return false;
    };
    if (editing !== null) {
      restoreDescription(editing);
    };
    editing = id;
    const task = tasks.find(el => el.id === id);
    const {description} = task;
    const callback = (ev) => {
      task.description = ev.target.value;
      editing = null; // no longer editing
      updateTask(task);
    };
    const props = {id, description, callback};
    renderer.render(<DescriptionField { ...props} />, ev.target); 
  };

  /**
   * Restore input fields on escape
   */
  window.addEventListener("keyup", (ev) => {
    if (ev.key && ev.key === "Escape" && editing) {
      restoreDescription(editing);
    };
  });

  for (const _ of this) { // eslint-disable-line no-unused-vars
    yield (
      <div class="pa4 mw6 center">
        { loading && <span>Loading</span> }
        { error && <span>{ error }</span> }
        { tasks.length > 0 && (
          <table  class="f6 w-100">
            <thead>
              <th class="fw6 bb b--black-20 tl pb2 pr3 bg-white">Description</th>
              <th class="fw6 bb b--black-20 tr pb2 pr3 bg-white">Completed</th>
              <th class="fw6 bb b--black-20 tl pb2 pr3 bg-white">&nbsp;</th>
            </thead>
            <tbody class="lh-copy">
              {tasks.map(task => (
                <tr>
                  <td class="pv3 pr3 bb b--black-20">
                    <div
                      class="pointer"
                      onclick={editDescription}
                      id={`description-${task.id}`}>
                      { task.description }
                    </div>
                    </td>
                  <td class="pv3 pr3 tr bb b--black-20">
                    <input 
                      name={task.id}
                      type="checkbox" 
                      checked={Boolean(task.completed)} 
                      onchange={markCompletion} />
                  </td>
                  <td class="pv3 pr3 tr bb b--black-20">
                    <div 
                      name={task.id}
                      onclick={removeTask}
                      class="pointer dark-red material-icons-outlined">
                      delete
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {adding ? (
          <div class="mt2">
            <input
              id="description"
              class="pa2 ba bg-transparent hover-bg-near-white w-100 input-reset br2"
              type="text"
              placeholder="Task description"
              onchange={getDescription} />
          </div>
        ) : (
          <div class="mt2">
            <button
              class="w-100 pa2 pointer"
              onclick={addTask}>
              <span class="mr2 material-icons">add_task</span>Add Task
            </button>
          </div>
        )}
      </div>
    )
  };
};

module.exports = Tasks;
