const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MySQL-tilkobling
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'butikk_db'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Tilkoblet til MySQL (butikk_db)');
});

// Create
app.post('/api/produkt', (req, res) => {
  const { navn, pris, kategori } = req.body;
  const sql = 'INSERT INTO produkter (navn, pris, kategori) VALUES (?, ?, ?)';
  db.query(sql, [navn, pris, kategori], (err, result) => {
    if (err) throw err;
    res.send('Produkt lagt til');
  });
});

// Read
app.get('/api/produkter', (req, res) => {
  db.query('SELECT * FROM produkter', (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Update
app.put('/api/produkt/:id', (req, res) => {
  const { id } = req.params;
  const { navn, pris, kategori } = req.body;
  const sql = 'UPDATE produkter SET navn = ?, pris = ?, kategori = ? WHERE id = ?';
  db.query(sql, [navn, pris, kategori, id], (err, result) => {
    if (err) throw err;
    res.send('Produkt oppdatert');
  });
});

// Delete
app.delete('/api/produkt/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM produkter WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.send('Produkt slettet');
  });
});

app.listen(3000, () => {
  console.log('Server kjører på http://localhost:3000');
});

