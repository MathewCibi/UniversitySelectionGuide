const express = require('express');
const cors = require('cors');
const pg = require('pg');
const dotenv = require('dotenv');
dotenv.config();

console.log("Loading server-side backend node script.");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : false}));

// Post
app.post('/insert', (request, response) => {

});

// Read request handler
app.get('getAll', (request, response) => {
    console.log('Recieved API Call')
    response.json({
        success: true
    });
});

app.listen(process.env.PORT, () => console.log('app is running'));