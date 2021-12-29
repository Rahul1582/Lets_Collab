const mongoose = require("mongoose");
require('dotenv').config();

const connect = `${process.env.MONGO_URI}`;

const connectdb = async ()=>{

    await mongoose.connect(connect , {    
    useNewUrlParser: true,
    useUnifiedTopology: true})
   
    .then(() => {
        console.log("Connected with the Database");
      })
      .catch(error => {
        console.log(error, "Not Connected with the Database ");
 });
}

module.exports = connectdb;

