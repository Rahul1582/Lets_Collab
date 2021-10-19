const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema({

    name : {
        type: String,
        required:true
    },

    email :{
        type: String,
        required: true,
        unique:true
    },

    password :{
        type: String,
        required: true
    },

    joinedrooms:[
        {
            type: mongoose.Schema.Types.ObjectID,
            ref: 'Chatroom',
        }
    ]
});

module.exports = mongoose.model('User',user);