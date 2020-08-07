var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var listingSchema = new Schema({
  seller: {
    type: Schema.Types.ObjectId,
    ref: 'Seller'
  },
  name: String,
  condition: String,
  category: String,
  style: String,
  brand: String,
  //For description component
  asDescribed: Boolean,
  description: String
});

var sellerSchema = new Schema({
  name: String,
  listings: [{
    type: Schema.Types.ObjectId,
    ref: 'Listing'
  }],
  reviews: [{
    rating: Number,
    author: String,
    date: Date,
    description: String
  }]
});

var reviewSchema = new Schema({
  rating: Number,
  author: String,
  date: Date,
  description: String
});

var Listing = mongoose.model('Listing', listingSchema);
var Seller = mongoose.model('Seller', sellerSchema);
var Review = mongoose.model('Review', reviewSchema);
module.exports = [
  Listing, Seller, Review
];