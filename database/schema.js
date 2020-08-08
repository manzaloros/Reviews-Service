const { Schema, model } = require('mongoose');

const listingSchema = new Schema({
  seller: {
    type: Schema.Types.ObjectId,
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

const sellerSchema = new Schema({
  name: String,
  listings: [{
    type: Schema.Types.ObjectId,
    ref: 'Listing'
  }],
  reviews: [{
    rating: Number,
    listing_id: {
      type: Schema.Types.ObjectId,
      ref: 'Listing'
    },
    author: String,
    date: Date,
    description: String
  }]
});

const Listing = model('Listing', listingSchema);
const Seller = model('Seller', sellerSchema);
module.exports = [
  Listing, Seller
];
