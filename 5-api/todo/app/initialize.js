/** @jsx createElement */

const { createElement } = require("@bikeshaving/crank/cjs");
const { renderer } = require("@bikeshaving/crank/cjs/dom");

const HelloWorld = async () => {
  return (
    <div>Hello world</div>
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
   * The fetched list of tasks
   *
   * @member {array} tasks
   */
  let tasks = [];

  const getTasks = async () => {
    const opts = {
      method: "GET",
    };
    return await fetch("/api")
      .then(async (response) => {
        return await response.json();
      })
      .then((json) => {
        console.log(json);
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
            tasks.map(task => (
              <div>{ task.description }</div>
            ))
          )}
        </div>
      </div>
    )
  };
};

document.addEventListener('DOMContentLoaded', () => {
  console.log('Initialized app');
  renderer.render(<Tasks />, document.querySelector("#app"))
});

