const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatbody = {

    userid: {
        type: String,
        required:true,
    },
    username:{
        type: String,
        required:true,
    },
    message:{
        type: String,
        required:true,
    },
    time:{
        type: String,
        required:true,
    },
    file:{
        type: String,
        required:true,
    },
    base64String: { type: String },

    usermail: { type: String },
};

const chatroom = new Schema({

    title: {
        type: String,
        required:true
    },

    msgarray:{
        type: [ChatBody],
    },

    joinedusers:[
        {
            type: mongoose.Schema.Types.ObjectID,
            ref: 'user',
        }
    ],

    lastmsg: {
        type: String,
      },

    meet: {
        type: mongoose.Schema.Types.ObjectID,
        ref:'remainder',
      },
    },
    {
      timestamps: true, 
    }
);

module.exports = mongoose.model('chatroom',chatroom);