const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',  // ✅ Replace with your MySQL username if different
  password: '',  // ✅ Replace with your MySQL password
  database: 'smartlab'
});

connection.connect((err) => {
  if (err) {
    console.error('⚠️ Database connection failed:', err);
    return;
  }
  console.log('✅ Connected to MySQL database!');
});

module.exports = connection;
