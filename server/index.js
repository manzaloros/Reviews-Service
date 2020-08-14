const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('../database');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 2625;

app.use('/dist', express.static(path.join(__dirname, './../dist')));
app.use('/item/:user', express.static(path.join(__dirname, './../public')));
app.use('/', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/api/seller', (req, res) => {
  db.getAllSellers((data) => {
    res.send(data);
  });
});

app.get('/api/seller/:id', (req, res) => {
  db.getOneSeller(req.params.id, (data) => {
    res.send(data);
  });
});

app.get('/api/item', (req, res) => {
  db.getAllListings((data) => {
    res.send(data);
  });
});

app.get('/api/item/endpoint/:listingId', (req, res) => {
  db.getOneListingByEndpoint(req.params.listingId, (data) => {
    res.send(data);
  });
});

app.get('/api/item/:listingId', (req, res) => {
  db.getOneListing(req.params.listingId, (data) => {
    res.send(data);
  });
});

app.get('/api/item/:listingId/reviews', (req, res) => {
  db.getSellerReviewsForListing(req.params.listingId, (data) => {
    res.send(data);
  });
});

app.listen(port, () => {
  console.log('Listening in on port', port);
});
