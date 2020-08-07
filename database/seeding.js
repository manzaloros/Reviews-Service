const faker = require('faker');
const [Listing, Seller, Review] = require('./schema.js');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const Schema = require('./schema.js');

var conditions = ['Mint', 'Near Mint', 'Damaged'];

var generateSellers = function() {
  var Sellers = [];
  for (var i = 0; i < 50; i++) {
    var reviewCount = Math.floor(Math.random() * 10);
    var seller = new Seller({
      name: faker.name.findName(),
      listings: [],
      reviews: []
    });
    Sellers.push(seller);
    for (var j = 0; j < reviewCount; j++) {
      var review = new Review({
        rating: Math.floor(Math.random() * 5) + 1,
        author: faker.name.findName(),
        date: faker.date.past(),
        description: faker.lorem.paragraph()
      });
      seller.reviews.push(review);
    }
  }
  return Sellers;
}

var generateListings = function() {
  var Listings = [];
  for (var i = 0; i < 100; i++) {
    var listing = new Listing({
      name: faker.name.findName(),
      condition: conditions[Math.floor(Math.random() * 3)],
      category: faker.lorem.word(),
      style: faker.hacker.adjective(),
      brand: faker.company.companyName(),
      asDescribed: !!(Math.floor(Math.random() * 2)),
      description: faker.lorem.paragraph()
    });
    Listings.push(listing);
  };
  return Listings;
}

var linkListingsAndSellers = function(listings, sellers) {
  for (var i = 0; i < listings.length; i++) {
    var randomSellerIndex = Math.floor(Math.random() * sellers.length);
    listings[i].seller = sellers[randomSellerIndex]._id;
    sellers[randomSellerIndex].listings.push(listings[i]._id);
  }
};

var listings = generateListings();
var sellers = generateSellers();
linkListingsAndSellers(listings, sellers);

var createConnection = MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db('reviewsdb');
  dbo.createCollection('listings', (err, res) => {
    if (err) throw err;
    console.log('listings created');
    dbo.createCollection('sellers', (err, res) => {
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
  // db.close();
});

//console.log(sellers);
