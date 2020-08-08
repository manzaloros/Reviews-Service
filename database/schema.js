const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Seller'
  },
  name: String,
  condition: String,
  category: String,
  style: String,
  brand: String,
  //  For description component
  asDescribed: Boolean,
  description: String
});

const sellerSchema = new mongoose.Schema({
  name: String,
  listings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Listing'
  }],
  reviews: [{
    rating: Number,
    listing_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Listing'
    },
    author: String,
    date: Date,
    description: String
  }]
});

const Listing = mongoose.model('Listing', listingSchema);
const Seller = mongoose.model('Seller', sellerSchema);
module.exports = [
  Listing, Seller
];
