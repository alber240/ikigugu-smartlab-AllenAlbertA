const express = require('express');
const connection = require('./db'); // ✅ Ensure db.js exists!

const app = express();
const PORT = 3001;

app.get('/sensors', (req, res) => {
  connection.query('SELECT * FROM sensors', (err, results) => {
    if (err) {
      res.status(500).send('⚠️ Error fetching data');
    } else {
      res.json(results);
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
