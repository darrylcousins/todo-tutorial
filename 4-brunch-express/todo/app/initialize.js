/** @jsx createElement */

const { createElement } = require("@bikeshaving/crank/cjs");
const { renderer } = require("@bikeshaving/crank/cjs/dom");

const HelloWorld = () => {
  return (
    <div>Hello world</div>
  );
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('Initialized app');
  renderer.render(<HelloWorld />, document.querySelector("#app"))
});

