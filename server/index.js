const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('../database');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 2625;

app.use('/dist', express.static(path.join(__dirname.slice(0, -6), 'dist')));
app.use(express.static(path.join(__dirname.slice(0, -6), 'public')));

app.get('/', (req, res) => {
  res.sendStatus(200);
});

app.get('/seller', (req, res) => {
  db.getAllSellers((data) => {
    res.send(data);
  });
});

app.get('/seller/:id', (req, res) => {
  db.getOneSeller(req.params.id, (data) => {
    res.send(data);
  });
});

app.get('/item', (req, res) => {
  db.getAllListings((data) => {
    res.send(data);
  });
});

app.get('/item/:listingId', (req, res) => {
  db.getOneListing(req.params.listingId, (data) => {
    res.send(data);
  });
});

app.get('/item/:listingId/reviews', (req, res) => {
  db.getSellerReviewsForListing(req.params.listingId, (data) => {
    res.send(data);
  });
});

app.listen(port, () => {
  console.log('Listening in on port', port);
});
