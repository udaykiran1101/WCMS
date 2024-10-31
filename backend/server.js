const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const PORT = 8080;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // replace with your MySQL username
  password: 'S+5)z,8788', // replace with your MySQL password
  database: 'WCMS'
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Could not connect to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Get all species
app.get('/api/species', (req, res) => {
  db.query('SELECT * FROM species', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch species.' });
    }
    res.json(results);
  });
});

// Add a new species
app.post('/api/species', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Species name is required.' });
  }
  db.query('INSERT INTO species (name) VALUES (?)', [name], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to add species.' });
    }
    res.status(201).json({ id: result.insertId, name });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

