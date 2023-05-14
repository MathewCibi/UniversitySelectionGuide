const express = require('express');
const path = require('path');

console.log("Hello from Node!")

const app = express();
const publicPath = path.join(__dirname, 'public_html');

app.use(express.static(publicPath));

app.listen(21)