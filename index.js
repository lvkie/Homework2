const express = require('express');
const fs = require('fs');
const path = require('path');
const server = express();
const port = 3000;

// Serve static files from the 'public' directory
server.use(express.static('public'));

function updateHitCounter() {
    const filePath = 'hits.txt';
    let hits = 0;
    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf8');
        hits = parseInt(data);
    }

    hits++;
    fs.writeFileSync(filePath, hits.toString());
    return hits;

}

function getRandomWord() {
    const filePath = 'allwords.txt';
    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf-8');
        //break up the lines
        const lines = data.split('\n');
        //get a random word
        const randomLine = lines[Math.floor(Math.random() * lines.length)];
        //separate the parts
        const [word, part, defn] = randomLine.split('\t');
        return { word: word, part: part, definition: defn };
    }
    //return the data

}


// API Endpoint that returns info on how many visits there have been.
server.get('/hits', (req, res) => {
    const hits = updateHitCounter();
    res.json({ hits });
});

server.get('/wordRequest', (req, res) => {
    // request
    const wordInfo = getRandomWord();
    // response
    res.json(wordInfo);
});

server.get('/goodbye', function (req, res) {
    res.send('See ya later boss!');
});

server.get('/hello', function (req, res) {
    res.send('<h1>Hello World</h1>');
});

server.listen(port, function () {
    console.log(`Listening at http://localhost:${port}`);
});