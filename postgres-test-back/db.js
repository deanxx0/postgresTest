const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  password: '1234',
  host: 'localhost',
  port: 5432,
  database: 'test'
});

// pool.query('CREATE TABLE todo(todo_id SERIAL PRIMARY KEY, description VARCHAR(255))');
// database: test
// table: todo

module.exports = pool;
