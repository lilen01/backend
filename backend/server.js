const express = require('express');
const fs = require('fs');

const app = express();

const PORT = 8080;
const link = "http://127.0.0.1:8080/";

app.use((req, res, next) => {
    console.log(`hostname: ${req.hostname}, URL: ${req.url}, Method: ${req.method}`);
    next();
})


app.get("/", (req, res) => {
    res.send("Hello");
});

app.get("/about", (req, res) => {
    fs.readFile('../model/user.json', 'utf8', (err, data) => {
        if(err) {
            console.log("Error: ", err);
            res.status(404).send("404 Page Not Found");
        } else {
            const jsonData = JSON.parse(data);
            res.json(jsonData.credentials[0]);
        }
    })
})


app.listen(PORT, () => {
    console.log("Server running on port, click here ", link);
});
