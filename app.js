const express = require('express');
const cors = require('cors');
const { Client } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

console.log("Loading server-side backend node script.");

const client = new Client({
  user: "UniversitySelectionGuideDB_losedress",
  host: "vlv.h.filess.io",
  database: "UniversitySelectionGuideDB_losedress",
  password: "cd0ed39d257b526db4087ab10533ee1d527a6309",
  port: "5432",
});

client.connect();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : false}));

// Post
app.post('/insert', (request, response) => {

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
                client.end();
            });
        }
    }
    response.json({
        success: true,
        entries: Object.entries(request.query)
    });
});



app.listen(process.env.PORT, () => console.log('app is running'));