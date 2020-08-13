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
  let name;
  for (let i = 0; i < 50; i += 1) {
    reviewCount = Math.floor(Math.random() * 10);
    if (i === 0) {
      name = 'Willie Dustice';
    } else {
      name = faker.name.findName();
    }
    seller = new Seller({
      name,
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
      description: faker.lorem.paragraph(),
      id_count: i
    });
    listingsArray.push(listing);
  }
  return listingsArray;
};

const linkListingsAndSellers = (listings, sellers) => {
  const updatedListings = listings;
  let randomSellerIndex;
  for (let i = 0; i < listings.length; i += 1) {
    randomSellerIndex = Math.floor(Math.random() * sellers.length);
    updatedListings[i].seller = sellers[randomSellerIndex]._id;
    sellers[randomSellerIndex].listings.push(listings[i]._id);
    sellers[randomSellerIndex].listing_counts.push(listings[i].id_count);
  }
  return updatedListings;
};

const linkReviewsAndListings = (listings, sellers) => {
  const updatedSellers = sellers;
  let randomIndex;
  for (let i = 0; i < sellers.length; i += 1) {
    for (let j = 0; j < sellers[i].reviews.length; j += 1) {
      if (sellers[i].listings.length > 0) {
        randomIndex = Math.floor(Math.random() * sellers[i].listings.length);
        updatedSellers[i].reviews[j].listing_id = sellers[i].listings[randomIndex];
        updatedSellers[i].reviews[j].listing_id_count = sellers[i].listing_counts[randomIndex];
      }
    }
  }
  return updatedSellers;
};

let listings = generateListings();
let sellers = generateSellers();
listings = linkListingsAndSellers(listings, sellers);
sellers = linkReviewsAndListings(listings, sellers);

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
