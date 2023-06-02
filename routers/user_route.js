const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("./../middleware/auth.js");
const User = require('./../models/users_model.js');
const Product = require('./../models/product_model.js');
const Review = require('./../models/review_model.js');
const Order = require('./../models/order_model.js');
const router = new express.Router();

//all users
router.get("/users", async(req,res)=>{
    try {
        await User.find({}).then((users) => {
            res.status(200).send(users);
        })} catch (error){
        res.status(500).send();
    }
});
router.get('/users/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        await User.findById(userId).then((users) => {
            res.status(200).send(users);
        })} catch (error){
        res.status(500).send();
    }
});
//create user
router.post('/user/add', async (req, res) => {
    const { first_name,last_name, email, password } = req.body;

    let user = new User({first_name: first_name , last_name:last_name, email: email, password: password});
    try{
        await user.save().then(() =>{
            console.log(user);
        })} catch (error){
        console.log(error)
    }
});
//delete  //rework*****
router.delete('/users/del/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).send('User not found');
        }

        res.send(deletedUser);
    } catch (error) {
        res.status(400).send(error);
    }
});


//authenticate
router.post("/users/me", auth, async (req, res) => {
    try {
        // отримання користувача за його токеном
        const user = await User.findById(req.user._id);

        // заповнення віртуального поля product
        await user.populate('Product');

        res.send([user , user.Product]);
    } catch (error) {
        res.status(500).send(error);
    }
});
router.post("/users/login", async (req,res)=>{
    try{
        const user = await User.findOneByCredentials(req.body.email , req.body.password);
        const token = await user.generateAuthToken();
        res.send({user,token});
    }catch (e){
        res.status(400).send()
    }
});
router.post("/users/logout", auth , async (req,res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });
        await req.user.save();
        res.send();
    } catch (error) {
        res.status(500).send(error);
    }
})
router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    } catch (error) {
        res.status(500).send(error);
    }
});

router.patch('/user',auth, async (req, res) => {
    const id  = req.user._id;
    const { first_name,last_name, email, password } = req.body;
    try {

        if (password) {
            req.body.password = await bcrypt.hash(password, 8);
        }
        const updatedUser = await User.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!updatedUser) {
            return res.status(404).send('User not found');
        }

        res.send(updatedUser);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;