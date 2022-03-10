const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const noteS = require('./db/db.json');
const { request } = require('http');
const { response } = require('express');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    let fPath = path.join(__dirname, './db/db.json');
    let noteS = [];
    const json = fs.readFile(fPath, 'utf-8', (err, data) => {
        console.log(data);
        noteS = JSON.parse(data);
        res.json(noteS);
    });
});

app.post('/api/notes', (req, res) => {
    let fPath = path.join(__dirname, './db/db.json');
    console.log(fPath);
    let noteN = {
        id: uuidv4(),
        title: req.body.title,
        text: req.body.text
    }
    let noteS = [];
    const json = fs.readFile(fPath, 'utf-8', (err, data) => {
        console.log(data);
        noteS = JSON.parse(data);

        noteS.push(noteN);
        console.log(noteS);
        fs.writeFile(fPath, JSON.stringify(noteS, null, 4), (err) => {
            if (err) {
                return console.log(err);
            } else {
                console.log('Saved');
            }
        });
        const response = {
            "status": "success",
            "body": noteN,
        }
        res.status(201).json(response);
    });

    // res.json(noteN);
});

app.delete('/api/notes/:id', function (req, res) {
    let id = req.params.id.toString();

    const noteS = JSON.parse(fs.readFileSync('./db/db.json'));
    for (i = 0; i < noteS.length; i++) {
        if (noteS[i].id == id) {
            res.send(noteS[i]);
            noteS.splice(i, 1);
            break;
        }
    };

    let fPath = path.join(__dirname, './db/db.json');
    fs.writeFile(fPath, JSON.stringify(noteS), (err) => {
        if (err) {
            return console.log(err);
        } else {
            console.log('Deleted');
        }
    })
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, () =>
    console.log(`Listening at http://localhost:${PORT}`));