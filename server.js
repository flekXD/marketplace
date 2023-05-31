const express = require("express");
const mongoose = require('mongoose');
const User = require("./routers/user_route");
//const Task = require("./routers/product");
require("dotenv").config()

let url = process.env.MONGO_URL;
let port = process.env.PORT
mongoose.connect(url)

const app = express();


app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.get("/", (req,res)=>{
    res.send("Successful");
});
app.use(User);
//app.use(Task);

app.listen(port, () => {
    console.log(`Server is listening on ${port} port`)
})
module.exports = app;