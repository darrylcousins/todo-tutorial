# API

Connect to mariadb and build api to query database.

Ensure that database connector and dotenv are installed.

```bash
$ npm install --save-dev mariadb dotenv
```

Add bodyParser to brunch-server.js:

```javascript
const bodyParser = require('body-parser');
```

And add to express stack, make sure it is before other routes.

```javascript
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
```

## Test api using curl

```bash
$ curl -X GET http://localhost:3333/api
$ curl -X GET http://localhost:3333/api?id=3
$ curl -X POST -d '{"description":"test1"}'  -H "Content-Type: application/json" http://localhost:3333/api/
$ curl -X GET http://localhost:3333/api?id=1
$ curl -X PUT  -d '{"id":1, "description": "test2", "completed": 1}' -H "Content-Type: application/json" http://localhost:3333/api/
```

## Access api from client app

At first write a task listing into initialize.js - later will split out into components.
