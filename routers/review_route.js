const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("./../middleware/auth.js");
const auth_prod = require("./../middleware/auth_product.js");
const User = require('./../models/users_model.js');
const Product = require('./../models/product_model.js');
const Review = require('./../models/review_model.js');
const Order = require('./../models/order_model.js');
const router = new express.Router();

router.get("/reviews", async(req,res)=>{
    try {
        await Product.find({}).then((product) => {
            res.status(200).send(product);
        })} catch (error){
        res.status(500).send();
    }
});

router.post('/reviews/add', auth,auth_prod, async (req, res) => {
    const { rating, comment} = req.body;

    const review = new Review({
        rating: rating,
        comment: comment,
        product: req.product.id,
        creator : req.user.id
    });
    try{
        await review.save().then(() =>{
            console.log(review);
        })} catch(error) {
        console.log(error)
    }
});

router.get('/reviews/:id', async (req, res) => {
    try {
        const reviews = await Review.findOne({ _id: req.params.id})
        await reviews.populate('creator');
        await reviews.populate('product');
        if (!reviews) {
            return res.status(404).send()
        }

        res.send(reviews)
    } catch (e) {
        res.status(400).send(e)
    }

});

router.delete('/reviews/del/:id',auth,auth_prod, async (req, res) => {
    try {
        const review = await Product.findOneAndDelete({ _id: req.params.id, creator: req.user._id , product : req.product._id })

        if (!review) {
            return res.status(404).send()
        }

        res.send(review)
    } catch (e) {
        res.status(500).send()
    }
});

router.patch('/reviews/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['rating','comment']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const review = await Review.findOne({ _id: req.params.id, creator: req.user._id })

        if (!review) {
            return res.status(404).send()
        }

        updates.forEach((update) => review[update] = req.body[update])
        await review.save()
        res.send(review)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router;