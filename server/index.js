const express = require('express');
const path = require('path');
const { port } = require('../config.js');

// Metrics:
require('newrelic');

const app = express();
// Do I not need to specify index.js in database?
const db = require('../database');

app.use('/item/:user', express.static(path.join(__dirname, './../public')));
app.use('/dist', express.static(path.join(__dirname, './../dist')));
// app.use(express.json());

/*
 * For Loader.io testing:
 */
app.get('*/loaderio-27c89d28eabc75aa3aa709ffb5ba0029', async (req, res) => {
  try {
    await res.sendFile(path.join(__dirname, '..', '/loaderio-27c89d28eabc75aa3aa709ffb5ba0029.txt'));
    console.log('Loader file sent');
  } catch (err) {
    res.status(500).end(err);
  }
});
/*
 *  Response needs to return an guitar object with an _id property
 *  linked to the following GET request listingId
 */
app.get('*/reviews/api/item/endpoint/:id', async (req, res, next) => {
  let guitar;
  try {
    // Client API expects an object, return first object in array:
    [guitar] = await db.findGuitar(req.params.id);
    // return res.send(guitar);
  } catch (error) {
    // What to do with error?
    return next(error);
    // return res.status(500).end(error);
  }
  return res.send(guitar);
});

/*
 *  Response needs to return an array of review objects with all properties
 *  Client sets its state with this array
 */
app.get('*/reviews/api/item/:guitarId/reviews', async (req, res, next) => {
  let reviews;
  try {
    reviews = await db.findMatchingReviews(req.params.guitarId);
  } catch (error) {
    // What to do with error?
    return next(error);
    // return res.status(500).end(error);
  }

  return res.send(reviews);
});

/*
 *  Needs to return an {name: <guitar name>} object.
 */
app.get('*/reviews/api/item/:id', async (req, res, next) => {
  let guitar;
  try {
    guitar = await db.findGuitar(req.params.id);
  } catch (error) {
    // What to do with error?
    return next(error);
    // return res.status(500).end(error);
  }

  return res.send(guitar);
});

// /*
//  *  Add a guitar {name, productId} to the database
//  */
// app.post('*/guitars', async (req, res) => {
//   try {
//     const result = await db.insertGuitar(req.body);
//     res.send(result);
//   } catch (error) {
//     res.status(500).end(error);
//   }
// });

app.listen(port, () => {
  console.log(`Reviews Service listening on port ${port}`);
});
