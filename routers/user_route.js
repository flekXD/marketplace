
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("./../middleware/auth.js");
const User = require('./../models/users_model.js');
const Product = require('./../models/product_model.js');
const Review = require('./../models/review_model.js');
const Order = require('./../models/order_model.js');
const router = new express.Router();

router.get("/users", async(req,res)=>{
    try {
        await User.find({}).then((users) => {
            res.status(200).send(users);
        })} catch (error){
        res.status(500).send();
    }
});

router.post("/users/me", auth, async (req, res) => {
    try {
        // отримання користувача за його токеном
        const user = await User.findById(req.user._id);

        // заповнення віртуального поля product
        await user.populate('product');

        res.send([user , user.Product]);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;