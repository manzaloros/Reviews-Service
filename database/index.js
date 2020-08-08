var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var url = "mongodb://localhost:27017/reviewsdb";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});

module.exports.getAllSellers = function(callback) {
  MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    var dbo = db.db('reviewsdb');
    dbo.collection('sellers').find({}).toArray((err, result) => {
      if (err) throw err;
      callback(result);
      db.close();
    });
  });
};

module.exports.getAllListings = function(callback) {
  MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    var dbo = db.db('reviewsdb');
    dbo.collection('listings').find({}).toArray((err, result) => {
      if (err) throw err;
      callback(result);
      db.close();
    });
  });
};

module.exports.getOneListing = function(input, callback) {
  MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    var dbo = db.db('reviewsdb');
    var query = { "_id": ObjectId(input) };
    dbo.collection('listings').findOne(query, (err, result) => {
      if (err) throw err;
      callback(result);
      db.close();
    });
  })
}

module.exports.getSellerReviewsForListing = function(input, callback) {
  MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    var dbo = db.db('reviewsdb');
    var query = { "listings": {$in: [ObjectId(input)]} };
    dbo.collection('sellers').findOne(query, (err, result) => {
      if (err) throw err;
      var sortedReviews = result.reviews.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
      callback(sortedReviews);
      db.close();
    });
  });
}