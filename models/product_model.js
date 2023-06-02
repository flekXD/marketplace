const mongoose = require('mongoose');
const validator = require('validator');

const productSchema = new mongoose.Schema({
    title: {
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
    },
    tokens : [{
      token:{
          type: String,
          required: true
      }
  }]
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

productSchema.methods.generateAuthToken = async function () {

  const product = this;

  const token = jwt.sign({_id : product._id.toString()}, 'kdweueksdsjfij');

  product.tokens = product.tokens.concat({token});

  await product.save();

  return token;
};



/*const newProduct = new Product({
  name: 'Product Name',
  description: 'Product Description',
  price: 9.99,
  category: 'Category',
  subcategory: 'Subcategory',
  status: true,
  img: 'image.jpg',
  owner: '6477b159717584589a08ac73'
});
newProduct.save()
  .then(savedProduct => {
    console.log('Product saved:', savedProduct);
  })
  .catch(error => {
    console.error('Error saving product:', error);
  });*/


const Product = mongoose.model('Product', productSchema);

module.exports = Product;