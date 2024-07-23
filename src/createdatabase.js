const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Noam#2149',
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL server.');

  connection.query('CREATE DATABASE chat_database', (err, result) => {
    if (err) throw err;
    console.log('Database created successfully.');
    connection.end();
  });
});
