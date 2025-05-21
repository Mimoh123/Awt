const db = require('better-sqlite3')('database.db');
const express = require('express');
const app = express();
app.use(express.json());

db.prepare(
  `CREATE TABLE IF NOT EXISTS quotes (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT NOT NULL)`
).run();
app.get('/quotes', (req, res) => {
  const quotes = db.prepare('SELECT * FROM quotes').all();
  res.json(quotes);
});
app.post('/quotes', (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }
  const info = db.prepare('INSERT INTO quotes (text) VALUES (?)').run(text);
  res.status(201).json({ id: info.lastInsertRowid, text });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
