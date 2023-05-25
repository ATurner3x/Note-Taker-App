//REQUIREMENTS
const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

//EXPRESS CONFIGURATION
const app = express();
const PORT = process.env.PORT || 3000;

//MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// HTML Routes
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

// API Routes
app.get('/api/notes', (req, res) => {
  fs.readFile(path.join(__dirname, './db/db.json'), 'utf8', (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data);
    res.json(notes);
  });
});

app.post('/api/notes', (req, res) => {
  fs.readFile(path.join(__dirname, './db/db.json'), 'utf8', (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data);
    const newNote = req.body;
    newNote.id = uuidv4(); // Generate a unique ID for the new note using uuidv4
    notes.push(newNote);
    fs.writeFile(
      path.join(__dirname, './db/db.json'),
      JSON.stringify(notes),
      (err) => {
        if (err) throw err;
        res.json(newNote);
      }
    );
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
