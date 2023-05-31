const mongoose = require('mongoose');
const validator = require('validator');

const productSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim : true
    },
    description: {
      type: String
    },
    price: {
      type: Number,
      required: true,
      trim : true,
      min: 0
    },
    category: {
      type: String,
      required: true,
      trim : true
    },
    subcategory: {
      type: String,
      required: true,
      trim : true
    },
    status: {
      type: Boolean,
      required: true,
      trim : true
    },
    img: {
      type: String,
      required: true,
      trim : true,
      validate: {
        validator: function (value) {
          const extension = value.split('.').pop();
          return extension === 'jpg' || extension === 'png';
        },
        message: 'Only JPG and PNG images are allowed.'
      }
    },
    owner:{
        type : mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
  }, {toJson : {virtual: true}, toObject: {virtual:true}})

  productSchema.virtual('Review', {
    ref: "Review",
    localField : '_id',
    foreignField : 'product'
})

productSchema.virtual('Order', {
    ref: "Order",
    localField : '_id',
    foreignField : 'product'
})

const Product = mongoose.model('Product', productSchema);
module.exports = Product;