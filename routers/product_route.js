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

router.get('/products/:id', auth, async (req, res) => {
    try {
        const products = await Products.findOne({ _id: req.params.id, owner: req.user._id })
        const token = await products.generateAuthToken();
        await products.populate('owner');
        if (!products) {
            return res.status(404).send()
        }

        res.send({products,token})
    } catch (e) {
        res.status(400).send(e)
    }

});

router.post('/product/add', auth, async (req, res) => {
    const { title,description, completed} = req.body;

    const product = new Product({
        title: title,
        description: description,
        completed: completed,
        price: price,
        category : category,
        subcategory : subcategory,
        status: status,
        img : img,
        owner : req.user.id
    });
    try{
        await product.save().then(() =>{
            console.log(product);
        })} catch(error) {
        console.log(error)
    }
});

router.delete('/product/del/:id',auth, async (req, res) => {
    try {
        const product = await Product.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

        if (!product) {
            return res.status(404).send()
        }

        res.send(product)
    } catch (e) {
        res.status(500).send()
    }
});

router.patch('/product/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['title','description', 'completed','price','category','subcategory','status','img']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const product = await Product.findOne({ _id: req.params.id, owner: req.user._id })

        if (!product) {
            return res.status(404).send()
        }

        updates.forEach((update) => product[update] = req.body[update])
        await product.save()
        res.send(product)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router;