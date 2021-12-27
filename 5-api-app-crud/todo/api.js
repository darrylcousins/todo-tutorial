"use strict";

const express = require('express');
const router = express.Router();
const db = require('./db');

const runQuery = ({query, parameters, res}) => {
  db.pool.getConnection()
    .then(conn => {
      conn.query(query, parameters)
        .then(result => {
          res.json(result);
        })
        .catch(err => {
          res.status(400).send(err.message);
        })
        .finally(() => {
          conn.release();
        });
      ;
    })
    .catch(err => {
      res.status(400).send(err.message);
    });
};

/*
 * api get method, returns all tasks or single task if id supplied as query parameter
 */
router.get("/", async (req, res, next) => {
  try {
    const { id } = req.query;
    let query = "select * from tasks";
    let parameters = null;
    //if (Object.hasOwnProperty.call(req.query, "id")) {
    if (id) {
      query += " where id = ?";
      parameters = [id];
    };
    runQuery({query, parameters, res});
  } catch (err) {
    res.status(400).send(err.message);
  };
});

/*
 * api post method, insert new task - expects description only
 */
router.post("/", async (req, res, next) => {
  try {
    const { description } = req.body;
    const query = "insert into tasks (description) values (?)";
    const parameters = [description];
    runQuery({query, parameters, res});
  } catch (err) {
    res.status(400).send(err.message);
  };
});

/*
 * api put method, update task (could use patch here)
 */
router.put("/", async (req, res, next) => {
  try {
    const { description, completed, id } = req.body;
    const query = "update tasks set description = ?, completed = ? where id = ?";
    const parameters = [description, completed, id];
    runQuery({query, parameters, res});
  } catch (err) {
    res.status(400).send(err.message);
  };
});

/*
 * api delete method, delete task
 */
router.delete("/", async (req, res, next) => {
  try {
    const { id } = req.query;
    const query = "delete from tasks where id = ?";
    const parameters = [id];
    runQuery({query, parameters, res});
  } catch (err) {
    res.status(400).send(err.message);
  };
});

module.exports = router;
