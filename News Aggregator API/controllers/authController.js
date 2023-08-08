const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const User = require('../Model/user')

const signup = (req,res) => {
    let fullName = req.body.fullName;
    let email = req.body.email;
    let password = bcrypt.hashSync(req.body.password, 5);
    let preferences = req.body.preferences;

    const user = new User({
        fullName,
        email,
        password,
        preferences
    });

    user.save().then(result => {
        return res.status(200).send({ message: 'User Registered Successfully' })
    }).catch((err) => {
        return res.status(500).send({ message: "User Registration failed" })
    });
}

const signin = (req,res) => {
    let email = req.body.email
    let password = req.body.password;

    User.findOne({
        email: email
    }).then((user) => {
        let isValidPassword = bcrypt.compareSync(password, user.password);
        console.log(isValidPassword, "is-it")
        if (!isValidPassword) {
            console.log("wrong pass")
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password"
            })
        }
        else {
            var token = jwt.sign({ id: user._id}, "555");
            console.log("out token");
            res.status(200).send({
                user: {
                    user: user.id,
                    email: user.email,
                    fullName: user.fullName
                },
                message: "Login Successful",
                accessToken: token
            })
        }
    }).catch(err => {
        if (err) {
            return res.status(500).send({
                message:"it is reached here!!"
            })
        }
    })
}

module.exports = {signin,signup}