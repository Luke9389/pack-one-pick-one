const client = require('./db/client');
const express = require('express');
const cors = require('cors');

client.connect();

const app = express();
const port = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());
app.use(express.static('public'));


app.get('/api', (req, res) => {
  client.query('SELECT * FROM cards', function(err, rows, fields) {
    res.send(rows);
  });

});


app.listen(port, () => console.log(`Listening on port ${port}`));
