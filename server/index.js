/* eslint-disable camelcase */
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('../database');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 2625;

app.use('/dist', express.static(path.join(__dirname, './../dist')));
app.use('/item/:user', express.static(path.join(__dirname, './../public')));
app.use('/', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

/*
CREATE a seller, given a seller name and a seller object
*/
app.post('*/reviews/api/item/endpoint/:listingId', (req, res) => {
  db.postToEndpoint(req.params.listingId, req.body, (err, result) => {
    if (err) {
      return res.sendStatus(404);
    }
    return res.send(result);
  });
});

/*
PUT (update) a seller, given a seller name and a seller object
*/
app.put('*/reviews/api/seller/', (req, res) => {
  // Each field is an array, except for the name
  const {
    name, listings, listing_counts, reviews
  } = req.body;
  const newSeller = {
    name, listings, listing_counts, reviews
  };
  db.updateSeller(name, newSeller, (err, result) => {
    if (err) {
      return res.sendStatus(404);
    }
    return res.send(result);
  });
});

/*
  DELETE all reviews for an item
*/
app.delete('*/reviews/api/item/:listingId/reviews', (req, res) => {
  db.deleteReviews(req.params.listingId, (err, result) => {
    if (err) {
      return res.sendStatus(404);
    }
    return res.send(result);
  });
});

/*
  GET routes
*/
app.get('*/reviews/api/seller', (req, res) => {
  db.getAllSellers((data) => {
    res.send(data);
  });
});

app.get('*/reviews/api/seller/:id', (req, res) => {
  db.getOneSeller(req.params.id, (data) => {
    if (data === '404') {
      res.sendStatus(404);
    } else {
      res.send(data);
    }
  });
});

app.get('*/reviews/api/item', (req, res) => {
  db.getAllListings((data) => {
    if (data === '404') {
      res.sendStatus(404);
    } else {
      res.send(data);
    }
  });
});

/*
USED IN CLIENT:
listingID will be 1-100?
Needs to return a guitar object with an ._id property corresponding to
*/
app.get('*/reviews/api/item/endpoint/:listingId', (req, res) => {
  db.getOneListingByEndpoint(req.params.listingId, (data) => {
    if (data === '404') {
      res.sendStatus(404);
    } else {
      res.send(data);
    }
  });
});

/*
USED IN CLIENT:
Returns a guitar object.
*/
app.get('*/reviews/api/item/:listingId', (req, res) => {
  db.getOneListing(req.params.listingId, (data) => {
    if (data === '404') {
      res.sendStatus(404);
    } else {
      res.send(data);
    }
  });
});

/*
USED IN CLIENT:
Needs to return array of review objects (need all properties)
Client sets state with
*/
app.get('*/reviews/api/item/:listingId/reviews', (req, res) => {
  db.getSellerReviewsForListing(req.params.listingId, (err, data) => {
    if (err) {
      res.sendStatus(404);
    } else {
      res.send(data);
    }
  });
});

app.listen(port, () => {
  console.log('Listening in on port', port);
});
