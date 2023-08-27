const newsRoutes = require("express").Router()
const bodyParser = require('body-parser');
const { newsApi } = require("../helper/newsApi");
const verifyToken = require('../middleware/verifyToken');
const User = require("../Model/user");
require("dotenv").config();

let url = "https://newsapi.org/v2/top-headlines";

newsRoutes.use(bodyParser.urlencoded({ extended: false }));
newsRoutes.use(bodyParser.json());


newsRoutes.get('/news', verifyToken, async (req, res) => {
    if (!req.user && req.message) {
        return res.status(403).send({
            message: req.message
        });
    }
    if (!req.user && !req.message) {
        return res.status(401).send({
            message:'Invalid Token'
        })
    }
    console.log(req.user)
    const country = req?.country ||'in'
    const searchParams = new URLSearchParams();
    if (req.user.preferences.length >1) {
        for (preferences of req.user.preferences) {
            searchParams.append('category',preferences)
        }
    }
    else if (req.user.preferences.length ==0) {
      searchParams.append("category", "business");
    }
    searchParams.append("apiKey", process.env.News_API_KEY);
    console.log(searchParams)
    try {
        let resp = await newsApi(`${url}?country=${country}&${searchParams}`);
        res.status(200).json(resp.articles)
    } catch (error) {
        res.status(500).json({error:error})
    }
})

newsRoutes.get('/preferences', verifyToken, (req, res) => {
    if (!req.user&&!req.message) {
        return res.status(401).send({
            message:'Invalid Token'
        })
    }
    if (!req.user && req.message) {
        return res.status(403).send({
            message:req.message
        })
    }
    return res.status(200).send({
        preferences:req.user.preferences
    })
})

newsRoutes.put('/preferences', verifyToken, (req, res) => {
    let preferences = req.body.preferences;
    console.log(preferences)
     if (!req.user && !req.message) {
       return res.status(401).send({
         message: "Invalid Token",
       });
     }
     if (!req.user && req.message) {
       return res.status(403).send({
         message: req.message,
       });
    }
    if (req.user && preferences) {
        User.findOneAndUpdate({
            _id:req.user.id
        }, { preferences: preferences }).then(user => {
            res.status(200).send({message:'User Prefrences added succesfully'})
        }).catch(err => {
            res.status(500).send({
                message:err
            })
        })
    }
})

module.exports = newsRoutes