const mongoose = require('mongoose');
const validator = require('validator');

const orderSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    status: {
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

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;