// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require("body-parser");

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;
const server = app.listen(port, function () {

        console.log(`server is running on localhost ${port}`);
});

// POST ROUTE
app.post("/toServer", function(req , res) {
        //store the data that is posted from the app side into the JS object
        projectData = req.body;
        //print the data after receiving it in the server side
        console.log(projectData);
});

// GET ROUTE
app.get("/fromServer", function(req , res) {
        //send the data that is stored into the JS object to the app side
        res.send(projectData);
});