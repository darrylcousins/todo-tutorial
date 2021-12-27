## Brunch and Express

Introduce brunch and express to create working server to build upon.

Install brunch globally and then some packages for local install.

```bash
$ npm install -g brunch
$ npm install --save-dev express
```

Use `wget` to get brunch-server.js template file.

```bash
$ wget https://raw.githubusercontent.com/darrylcousins/todo-tutorial/main/4-brunch-express/todo/brunch-server.js
$ wget https://raw.githubusercontent.com/darrylcousins/todo-tutorial/main/4-brunch-express/todo/brunch-config.js
```

The server will now run on port 3333. To make it meaningful to go forward brunch requires an app folder with assets and code.

```bash
$ mkir -p app/assets
$ cd app/assets
$ wget https://raw.githubusercontent.com/darrylcousins/todo-tutorial/main/4-brunch-express/todo/app/assets/index.html
$ cd ../
$ wget https://raw.githubusercontent.com/darrylcousins/todo-tutorial/main/4-brunch-express/todo/app/initialize.js
```

Install crank and update babel for jsx compilation.

```bash
$ npm install --save @bikeshaving/crank@0.3.11
$ npm install --save-dev @babel/preset-react
