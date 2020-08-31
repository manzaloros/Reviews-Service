const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
// Do not need to specify index.js in database?
const db = require('../database/db');

/*
 *  Response needs to return an guitar object with an _id property
 *  linked to the following GET request listingId
 */
app.get('*/reviews/api/item/endpoint/:listingId', async (req, res) => {
  try {
    const guitar = await db.findGuitar(req.params.listingId);
    res.send(guitar);
  } catch (err) {
    res.status(500);
  }
});

/*
 *  Response needs to return an array of review objects with all properties
 *  Client sets its state with this array
 */
app.get('*/reviews/api/item/:listingId/reviews', (req, res) => {

});

/*
 *  Needs to return an {name: <guitar name>} object.
 */
app.get('*/reviews/api/item/:listingId', (req, res) => {

});

app.listen(port, () => {
  console.log(`Reviews Service listening at http://localhost:${port}`);
});
