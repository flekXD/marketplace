const mongoose = require('mongoose');
const validator = require('validator');

const reviewSchema = new mongoose.Schema({
    rating: {
      type: String,
      required: true
    },
    comment: {
      type: String,
      required: true
    },
    creator:{
        type : mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    product:{
        type : mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    }
  });

  const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;