const express = require('express');
const cors = require('cors');
const { Client } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

console.log("Loading server-side backend node script.");
const connectionString = process.env.CONNECTION_STRING
var client = new Client(connectionString);
client.connect(function(error) {
    if (error) {
        return console.error("Could not connect to postgres", error);
    }
});

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : false}));

// Post
app.post('/insert', (request, response) => {
    console.log('Posting!');
    var entries = Object.entries(request.query)[0];
    try {
        // PRONE TO SQL INJECTION.
        var id = entries[0];
        var name = entries[1];
        var opinion = entries[2];
        var accomodation = entries[3];
        var teaching = entries[4];
        var community = entries[5];

        client.query(`INSERT INTO auckland (${id},${name},${opinion},${accomodation},${teaching},${community}`);

        response.json({
            success: false
        })
    } catch (error) {
        response.json({
            success: false
        })
    }
});



// Read request handler
app.get('/getAll', (request, response) => {
    console.log('Recieved API Call');
    var entries = Object.entries(request.query);
    var entry = entries[0]
    console.log(entry)
    if (entry[0] == "universityID") {
        if (entry[1] == "auckland") {
            client.query('select * from Auckland', (error, response) => {
                if (!error) {
                    console.log(res.rows);
                } else {
                    console.log("Error Occured: " + error.message)
                }
            });
        }
    }
    response.json({
        success: true,
        entries: Object.entries(request.query)
    });
});



app.listen(process.env.PORT, () => console.log('app is running'));