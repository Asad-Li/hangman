const express = require('express')
const app = express()
const port = 1234
const fs = require('fs');

fs.readFile('./src/highscores.json', function(err, data) {
    if (err) throw err;
    const scores = JSON.parse(data);
    console.log(scores);

    app.get('/', (req, res) => {
        res.send(scores)
    })
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})