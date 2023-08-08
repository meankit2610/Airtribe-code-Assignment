const express = require('express')
const bodyParser = require('body-parser')
const routes = require('express').Router();
const { signin, signup } = require("./controllers/authController");
const mongoose = require("mongoose")
const app = express()
app.use(bodyParser.json());
app.use(routes);


//connection to DB
try {
    mongoose.connect("mongodb://localhost:27017/usersdb", {
        useUnifiedTopology: true,
        useNewUrlParser:true
    });
    console.log("Connected to DB")
} catch (error) {
    console.log(error)
    
}

routes.get('/', (req, res) => {
    res.status(200).send("Welcome The News API")
})

routes.use('/register',signup)
routes.use('/signin',signin)


app.listen(8080, (err) => {
    if (err) {
        console.log("Error in starting the server")
    } else {
        console.log("Server Starting Successfully")
    }
})
