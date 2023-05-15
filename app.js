const express = require('express');
const pg = require('pg')

console.log("Loading server-side backend node script.")

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : false}));

// Read request handler
app.get('getAll', (request, response) => {
    response.json({
        success: true
    });
})

app.listen(21)