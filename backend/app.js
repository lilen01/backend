const express = require('express');
const cors = require('cors');
// const fs = require('fs');
const app = express();

app.use(cors());    // for all incoming request
// app.use(cors({
//     origin: 'http://127.0.0.1:5500', // Allow requests from this origin
// }));

const routing = require('./Routes/route');


const PORT = 3000;
const link = "http://localhost:3000/";


// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// userdefined logger - to log entries
app.use((req, res, next) => {
    console.log(`hostname: ${req.hostname}, URL: ${req.url}, Method: ${req.method}`);
    next();
});

app.use(express.json());    // to parse JSON body

app.use('/', routing);


app.listen(PORT, () => {
    console.log("Server running on ", PORT, "click here ", link);
});