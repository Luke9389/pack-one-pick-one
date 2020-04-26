const client = require('./db/client');
const express = require('express');
const cors = require('cors');

client.connect();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
// app.use(express.static('public'));

app.get('/api/:set', (req, res) => {
  const { set } = req.params;
  console.log('api call for', set);
  client.query(`SELECT * FROM cards WHERE type_line NOT LIKE 'Basic%' AND expansion = '${set}'`, function (err, rows) {
    res.send(rows);
  });
});


app.listen(port, () => console.log(`Listening on port ${port}`));
