const express = require("express");
const bodyParser = require("body-parser");
const taskInfo = require("./routes/tasksinfo")
const routes = require('express').Router();

const app = express();
app.use(bodyParser.json());
app.use(routes);
app.use(bodyParser.urlencoded({ extended: false }));


routes.get("/", (req, res) => {
    res.status(200).send("Welcome On the server")
})

routes.use("/tasks", taskInfo)

const PORT = 8080
app.listen(PORT, (error) => {
    if (error) {
        console.log("Error Occured , server can't start", error);
    }
    else {
        console.log("Server is Started")
    }
});
