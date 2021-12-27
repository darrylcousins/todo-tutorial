# Tutorial Three

Connecting and querying database using node. We created the user and todo database in tutorial one.

Discuss .env files and why these details are not added to the repository. Have we already discussed .gitignore?

```bash
$ echo "
  DB_HOST=localhost
  DB_PORT=3306
  DB_USER=user
  DB_PASS=passwd
  DB_NAME=todo
  " > .env
```

```bash
$ cd todo
$ npm install --save mariadb
$ npm install --save dotenv
```
