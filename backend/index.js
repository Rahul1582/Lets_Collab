const express = require('express');
const connectdb = require('./config/dbconnection');
const cors = require("cors");
const bodyParser = require("body-parser");
const auth = require("./routes/auth");
const chats = require("./routes/chats");
const files = require("./routes/files");

const app= express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectdb();

// routes
app.use("/auth",auth);
app.use("/chats",chats);
app.use("/files",files);

const PORT = process.env.PORT || 8000;

app.get('/', (req,res) => {
    res.send('Welcome to Lets_Collab');
})

app.listen(PORT, ()=> console.log(`Server Started and running on port ${PORT}`));