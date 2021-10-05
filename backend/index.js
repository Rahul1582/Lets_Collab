const express = require('express');
const connectdb = require('./config/dbconnection');
const cors = require("cors");
const bodyParser = require("body-parser");

const app= express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectdb();

const PORT = process.env.PORT || 8000;

console.log(PORT);

app.get('/', (req,res) => {
    res.send('Welcome to Bloggers Arena');
})

app.listen(PORT, ()=> console.log(`Server Started and running on port ${PORT}`));