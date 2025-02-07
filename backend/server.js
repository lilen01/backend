const express = require('express');
const fs = require('fs');

const app = express();

const PORT = 8080;
const link = "http://127.0.0.1:8080/"
app.listen(PORT, () => {
    console.log("Server running on port, click here ", link);
});