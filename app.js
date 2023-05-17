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
app.get('/insert', (request, response) => {
    console.log('Posting!');
    try {
        // PRONE TO SQL INJECTION.
        var name = request.query.name;
        var opinion = request.query.opinion;
        var accomodation = request.query.accomodation;
        var teaching = request.query.teaching;
        var community = request.query.community;
        
        client.query(`INSERT INTO auckland (name, opinion, accomodation, teaching, community) VALUES ('${name}','${opinion}','${accomodation}',${teaching},${community});`, (error, response) => {
            if (!error) {
                console.log(res.rows);
            } else {
                console.log("Error Occured: " + error.message)
            }
        });

        response.json({
            success: true
        });
    } catch (error) {
        console.log(error);
        response.json({
            success: false,
            error: error
        });
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
            client.query('select * from Auckland', (error, res) => {
                if (!error) {
                    console.log(res.rows);
                    response.json({
                        success: true,
                        entries: res.rows
                    });
                } else {
                    console.log("Error Occured: " + error.message);
                    response.json({
                        success: false,
                        entries: Object.entries(request.query)
                    });
                }
            });
        }
    }
    
});



app.listen(process.env.PORT, () => console.log('app is running'));