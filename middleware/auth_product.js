const jwt = require("jsonwebtoken");
const Product = require("./../models/product_model");

const auth = async (req, res, next) => {
    console.log("123")
    try{
        const token = req.header('Authorization').replace('Bearer ', '');
        console.log(token);
        const decoded = jwt.verify(token , 'kdweueksdsjfij')
        const product = await Product.findOne({_id:decoded._id,'tokens.token' : token})
        if(!product){
            throw  new Error()
        }
        req.product = product;
        req.token = token;
        next();
    } catch (e){
        res.status(401).send({error: "Please visit a product"})
    }
}
module.exports = auth;
