const connection = require('./db');

connection.query('SELECT * FROM sensors', (err, results) => {
  if (err) {
    console.error('⚠️ Database error:', err);
  } else {
    console.log('✅ Data received:', results);
  }
});
