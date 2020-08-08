const faker = require('faker');
const { MongoClient } = require('mongodb');
const [Listing, Seller] = require('./schema.js');

const url = 'mongodb://localhost:27017/';
const conditions = ['Mint', 'Near Mint', 'Damaged'];

const generateSellers = () => {
  const sellersArray = [];
  let seller;
  let review;
  let reviewCount;
  for (let i = 0; i < 50; i += 1) {
    reviewCount = Math.floor(Math.random() * 10);
    seller = new Seller({
      name: faker.name.findName(),
      listings: [],
      reviews: []
    });
    sellersArray.push(seller);
    for (let j = 0; j < reviewCount; j += 1) {
      review = {
        rating: Math.floor(Math.random() * 5) + 1,
        author: faker.name.findName(),
        date: faker.date.past(),
        description: faker.lorem.paragraph()
      };
      seller.reviews.push(review);
    }
  }
  return sellersArray;
};

const generateListings = () => {
  const listingsArray = [];
  let listing;
  for (let i = 0; i < 100; i += 1) {
    listing = new Listing({
      name: faker.commerce.productAdjective().concat(' ', faker.commerce.productMaterial(), ' Guitar'),
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
};

const linkListingsAndSellers = (listings, sellers) => {
  let randomSellerIndex;
  for (let i = 0; i < listings.length; i += 1) {
    randomSellerIndex = Math.floor(Math.random() * sellers.length);
    listings[i].seller += sellers[randomSellerIndex]._id;
    sellers[randomSellerIndex].listings.push(listings[i]._id);
  }
};

const linkReviewsAndListings = (listings, sellers) => {
  let randomListingIndex;
  for (let i = 0; i < sellers.length; i += 1) {
    for (let j = 0; j < sellers[i].reviews.length; j += 1) {
      if (sellers[i].listings.length > 0) {
        randomListingIndex = Math.floor(Math.random() * sellers[i].listings.length);
        sellers[i].reviews[j].listing_id = sellers[i].listings[randomListingIndex]._id;
      }
    }
  }
};

const listings = generateListings();
const sellers = generateSellers();
linkListingsAndSellers(listings, sellers);
linkReviewsAndListings(listings, sellers);

MongoClient.connect(url, (err, db) => {
  if (err) throw err;
  const dbo = db.db('reviewsdb');
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
