const faker = require('faker');
const [Listing, Seller, Review] = require('./schema.js');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

var conditions = ['Mint', 'Near Mint', 'Damaged'];

var generateSellers = function() {
  var sellersArray = [];
  for (var i = 0; i < 50; i++) {
    var reviewCount = Math.floor(Math.random() * 10);
    var seller = new Seller({
      name: faker.name.findName(),
      listings: [],
      reviews: []
    });
    sellersArray.push(seller);
    for (var j = 0; j < reviewCount; j++) {
      var review = {
        rating: Math.floor(Math.random() * 5) + 1,
        author: faker.name.findName(),
        date: faker.date.past(),
        description: faker.lorem.paragraph()
      };
      seller.reviews.push(review);
    }
  }
  return sellersArray;
}

var generateListings = function() {
  var listingsArray = [];
  for (var i = 0; i < 100; i++) {
    var listing = new Listing({
      name: faker.commerce.productAdjective() + ' ' + faker.commerce.productMaterial() + ' Guitar',
      condition: conditions[Math.floor(Math.random() * 3)],
      category: faker.lorem.word(),
      style: faker.hacker.adjective(),
      brand: faker.company.companyName(),
      asDescribed: !!(Math.floor(Math.random() * 2)),
      description: faker.lorem.paragraph()
    });
    listingsArray.push(listing);
  }
  return listingsArray;
}

var linkListingsAndSellers = function(listings, sellers) {
  for (var i = 0; i < listings.length; i++) {
    var randomSellerIndex = Math.floor(Math.random() * sellers.length);
    listings[i].seller = sellers[randomSellerIndex]._id;
    sellers[randomSellerIndex].listings.push(listings[i]._id);
  }
};

var linkReviewsAndListings = function(listings, sellers) {
  for (var i = 0; i < sellers.length; i++) {
    for (var j = 0; j < sellers[i].reviews.length; j++) {
      if (sellers[i].listings.length > 0) {
        var randomListingIndex = Math.floor(Math.random() * sellers[i].listings.length);
        sellers[i].reviews[j].listing_id = sellers[i].listings[randomListingIndex]._id;
      }
    }
  }
}

var listings = generateListings();
var sellers = generateSellers();
linkListingsAndSellers(listings, sellers);
linkReviewsAndListings(listings, sellers);

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db('reviewsdb');
  dbo.createCollection('listings', (err) => {
    if (err) throw err;
    console.log('listings created');
    dbo.createCollection('sellers', (err) => {
      if (err) throw err;
      console.log('sellers created');
      dbo.collection('listings').insertMany(listings, (err, res) => {
        if (err) throw err;
        console.log('Number of listings inserted:', res.insertedCount);
        dbo.collection('sellers').insertMany(sellers, (err, res) => {
          if (err) throw err;
          console.log('Number of sellers inserted:', res.insertedCount);
          db.close();
        });
      });
    });
  });
});
