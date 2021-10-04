const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema({

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
            ref: 'chatroom',
        }
    ],
    },
    {
        timestamps: true, 
    }
);

module.exports = mongoose.model('file',file);