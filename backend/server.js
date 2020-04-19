const client = require('./db/client');
const express = require('express');
const cors = require('cors');

client.connect();

const app = express();
const port = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());
app.use(express.static('public'));


app.get('/api/allCards', (req, res) => {
  client.query('SELECT * FROM cards', function (err, rows) {
    res.send(rows);
  });
});

app.get('/api/setReview/:set', (req, res) => {
  const { set } = req.params;
  client.query(`SELECT * FROM cards WHERE expansion = '${set}'`, function (err, rows) {
    res.send(rows);
  });
});


app.listen(port, () => console.log(`Listening on port ${port}`));
