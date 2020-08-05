const express = require('express');
const path = require('path');
const app = express();
const port = 2625;

app.use('/dist', express.static(path.join(__dirname.slice(0, -6) + 'dist')));
app.use(express.static(path.join(__dirname.slice(0, -6) + 'public')));

app.get('/', (req, res) => {
  res.send(path.join(__dirname.slice(0, -6) + 'public'));
});

app.listen(port, () => {
  console.log('Listening in on port', port);
});