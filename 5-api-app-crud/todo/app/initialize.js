"use-strict"

/** @jsx createElement */

const { createElement } = require("@bikeshaving/crank/cjs");
const { renderer } = require("@bikeshaving/crank/cjs/dom");

const Tasks = require("./components/tasks");

document.addEventListener('DOMContentLoaded', () => {
  console.log('Initialized app');
  renderer.render(<Tasks />, document.querySelector("#app"))
});

