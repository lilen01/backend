const express = require('express');
const fs = require('fs');
const cors = require('cors');
// const routing = require('./Routes/route');


const app = express();
app.use(cors()); 

const PORT = 8080;
// const link = "http://127.0.0.1:8080/";
const link = "http://localhost:8080/";
const userModelPath = "./Model/user.json";
const cartModelPath = "./Model/cart.json";

// userdefined logger - to log entries
app.use((req, res, next) => {
    console.log(`hostname: ${req.hostname}, URL: ${req.url}, Method: ${req.method}`);
    next();
});

// app.use('/', routing);

// send complete user.json model
app.get("/user", (req, res) => {
    var user = req.params.userName;
    fs.readFile(userModelPath, 'utf8', (err, data) => {
        if(err) {
            console.log("Error: ", err);
            res.status(404).send("404 Page Not Found");
        } else {
            data = JSON.parse(data);        // parsing json from string
            res.json(data);                 // sending in JSON format
        }
    });
});


// send complete cart.json model
app.get("/cart", (req, res) => {
    fs.readFile(cartModelPath, 'utf8', (err, data) => {
        if(err) {
            console.log("Error: ", err);
            res.status(404).send("404 Page Not Found");
        } else {
            data = JSON.parse(data);        // parsing json from string
            res.json(data);                 // sending in JSON format
        }
    });
});

// send cart.json by username
app.get("/cart/:id", (req, res) => {
    var id = req.params.id;
    fs.readFile(cartModelPath, 'utf8', (err, data) => {
        if(err) {
            console.log("Error: ", err);
            res.status(404).send("404 Page Not Found");
        } else {
            data = JSON.parse(data);        // parsing json from string
            res.json(data.Cart[id]);                 // sending in JSON format
        }
    });
});

// get user.json by userName
app.get("/user/:user", (req, res) => {
    var user = req.params.user;  
    fs.readFile(userModelPath, 'utf8', (err, data) => {
        if(err) {
            console.log("Error: ", err);
            res.status(404).send("404 Page Not Found");
        } else {
            // const jsonData = JSON.parse(data);
            userData = JSON.parse(data);
            var oData = [];
            oData = userData.credentials;
            var data = oData.find(data => data.userName == user);
            res.json(data);
        }
    });
});


// Middleware to parse JSON bodies
app.use(express.json());

// save user credentials in user.json
app.post("/user", (req, res) => {
    // var user = req.params.user;  
    const incomingData = req.body;
    const fileData = fs.readFileSync(userModelPath, 'utf8');
    const fileJson = JSON.parse(fileData);
    var credential = [];
    credential = fileJson.credentials;
    credential.push(incomingData);
    console

    fs.writeFileSync(userModelPath, JSON.stringify(credential), 'utf8');
    console.log("Written successfully");
    
});


app.listen(PORT, () => {
    console.log("Server running on port, click here ", link);
});
