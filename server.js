const express = require('express');
const path = require('path');
const fs = require('fs');
const {v4:uuidv4} = require('uuid');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const noteS = require('./db/db.json');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, /public/notes.html));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    res.json(noteS)
});

app.post('/api/notes', (req, res) => {
    let fPath = path.join(__dirname, 'db/db.json');
    noteN = req.body;

    noteN.id = uuidv4();

    noteS.push(noteN);

    fs.writeFile(fPath. JSON.stringify(noteS), (err) => {
        if (err) {
            return console.log(err);
        } else {
            console.log('Saved');
        }
    })

    res.json(noteN);
});