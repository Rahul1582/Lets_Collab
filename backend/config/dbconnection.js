const mongoose = require("mongoose");
require('dotenv').config();

const connect = "mongodb+srv://rkp_lc:rahul158lc@cluster0.at9an.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

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

