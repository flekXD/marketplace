const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("./../middleware/auth.js");
const User = require('./../models/users_model.js');
const Product = require('./../models/product_model.js');
const Review = require('./../models/review_model.js');
const Order = require('./../models/order_model.js');
const router = new express.Router();

router.get("/products", async(req,res)=>{
    try {
        await Product.find({}).then((product) => {
            res.status(200).send(product);
        })} catch (error){
        res.status(500).send();
    }
});
module.exports = router;