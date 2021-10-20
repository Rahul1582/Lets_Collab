const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const file = new Schema({

    name : {
        type: String,
        required:true
    },

   base64String:{
        type: String,
        required: true,
    },

    roomid:[
        {
            type: mongoose.Schema.Types.ObjectID,
            ref: 'Chatroom',
        }
    ],
    },
    {
        timestamps: true, 
    }
);

module.exports = mongoose.model('File',file);