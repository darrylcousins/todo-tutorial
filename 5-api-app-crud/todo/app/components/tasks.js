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
    const {name} = ev.target;
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

  for (const _ of this) { // eslint-disable-line no-unused-vars
    yield (
      <div>
        <h2>
          Tasks
        </h2>
        <div>
          { loading && <span>Loading</span> }
          { error && <span>{ error }</span> }
          { tasks.length > 0 && (
            <table>
              <thead>
                <th>Description</th>
                <th align="right">Completed</th>
                <th>&nbsp;</th>
              </thead>
              <tbody>
                {tasks.map(task => (
                  <tr>
                    <td>{ task.description }</td>
                    <td align="right">
                      <input 
                        name={task.id}
                        type="checkbox" 
                        checked={Boolean(task.completed)} 
                        onchange={markCompletion} />
                    </td>
                    <td align="right">
                      <button
                        name={task.id}
                        onclick={removeTask}>
                        &#x2717;
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div>
          {adding ? (
            <Fragment>
              <input id="description" type="text" placeholder="Description" onchange={getDescription} />
              <button onclick={getDescription}>Submit</button>
            </Fragment>
          ) : (
            <button onclick={addTask}>Add Task</button>
          )}
        </div>
      </div>
    )
  };
};

module.exports = Tasks;
