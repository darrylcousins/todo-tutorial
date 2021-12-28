"use strict";

/** @jsx createElement */

const { createElement, Fragment } = require("@bikeshaving/crank/cjs");

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
    if (confirm(`Delete ${task.description}?`)) {
      deleteTask(task.id);
    }
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
                  <td class="pv3 pr3 bb b--black-20">{ task.description }</td>
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
                      class="pointer dark-red material-icons">
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
              class="pa2 input-reset ba bg-transparent w-100 measure"
              type="text"
              placeholder="Description"
              onchange={getDescription} />
            <button
              class="w-100 mt2 pa2"
              onclick={getDescription}>Submit</button>
          </div>
        ) : (
          <div class="mt2">
            <button
              class="w-100 pa2"
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
