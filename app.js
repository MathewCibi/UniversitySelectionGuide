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

function isNumeric(str) {
    if (typeof str != "string") return false
    return !isNaN(str) && 
           !isNaN(parseFloat(str))
}

// Post
app.get('/post', (request, response) => {
    console.log('Posting!');
    try {
        var table = "auckland";
        if (request.query.table_id == 1) { table = "otago";}
        
        // Were using a parameterized query which prevents SQL Injection!!! :woo!:
        const query_text = "INSERT INTO "+table+" (name, opinion, accommodation, teaching, community) VALUES ($1, $2, $3, $4, $5);";
        
        var name = request.query.name;
        var opinion = request.query.opinion;
        var accommodation = request.query.accommodation;
        var teaching = request.query.teaching;
        var community = request.query.community;

        if (name == "" || isNumeric(name)) {
            response.json({
                success: false,
                message: "The format for name is not correct, Please try again"
            });
        }

        if (opinion == "" || isNumeric(opinion)) {
            response.json({
                success: false,
                message: "The format for opinion is not correct, Please try again"
            })
        }
        const values = [name, opinion, accommodation, teaching, community];
        client.query(query_text, values, (err, res) => {
            if (err) {
                console.log(err);
                response.json({
                    success: false,
                    message: "Something went wrong, Please try again",
                    error: err
                });
            } else {
                response.json({
                    success: true,
                    message: "Your review has been added!"
                });
            }
        });

    } catch (error) {
        console.log(error);
        response.json({
            success: false,
            message: "Something went wrong, Please try again",
            error: error
        });
    }
});

app.get('/getRandom', (request, response) => {
    console.log('Recieved API Call');
    var table = 'auckland';
    if (request.query.table_id==1) {table='otago';}
    const query_text = `SELECT name, opinion FROM ${table} ORDER BY RANDOM() LIMIT 5;`;
    client.query(query_text, (error, res) => {
        if (error) {
            console.log(error);
            response.json({
                success: false,
                error: error
            });
        } else {
            response.json({
                success: true,
                message: res.rows
            });
        }
    });
})

// Read request handler
app.get('/getAll', (request, response) => {
    console.log('Recieved API Call');
    var entries = Object.entries(request.query);
    var entry = entries[0]
    console.log(entry)
    if (entry[0] == "universityID") {
        if (entry[1] == "auckland") {
            client.query('select * from auckland', (error, res) => {
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
        } else if (entry[1] == "otago") {
            client.query('select * from otago', (error, res) => {
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