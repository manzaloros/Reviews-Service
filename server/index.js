const express = require('express');
const path = require('path');
const app = express();

const db = require('../database');

const port = 2625;

app.use('/dist', express.static(path.join(__dirname.slice(0, -6) + 'dist')));
app.use(express.static(path.join(__dirname.slice(0, -6) + 'public')));

app.get('/', (req, res) => {
  res.sendStatus(200);
});

app.get('/api/sellers', (req, res) => {

});

app.get('/api/listings', (req, res) => {

});

app.listen(port, () => {
  console.log('Listening in on port', port);
});