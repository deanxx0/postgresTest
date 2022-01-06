var express = require('express');
var router = express.Router();
const pool = require('../db');

router.post('/todos', async (req, res, next) => {
  try {
    const {description} = req.body;
    const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", [description]);
    res.json(newTodo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

router.get('/todos', async (req, res, next) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (error) {
    console.error(error.message);
  }
});

router.get('/todos/:id', async (req, res, next) => {
  try {
    const {id} = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id=$1", [id]);
    res.json(todo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

router.put('/todos/:id', async (req, res, next) => {
  try {
    const {id} = req.params;
    const {description} = req.body;
    const updateTodo = await pool.query("UPDATE todo SET description=$1 WHERE todo_id=$2", [description, id]);
    res.json("Todo update!");
  } catch (error) {
    console.error(error.message);
  }
});

router.delete('/todos/:id', async (req, res, next) => {
  try {
    const {id} = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id=$1", [id]);
    res.json('Todo deleted!');
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
