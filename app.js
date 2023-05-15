const express = require('express');
const pg = require('pg')
const path = require('path');

console.log("Hello from Node!")

const app = express();
const publicPath = path.join(__dirname);

app.use(express.static(publicPath));
app.use(express.json());
app.use(express.urlencoded({extended : false}));

// Read request handler
app.get('getAll', (request, response) => {
    response.json({
        success: true
    });
})

app.listen(21)