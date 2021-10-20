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
        type: [chatbody],
    },

    joinedusers:[
        {
            type: mongoose.Schema.Types.ObjectID,
            ref: 'User',
        }
    ],

    lastmsg: {
        type: String,
      },
    },
    {
      timestamps: true, 
    }
);

chatroom.pre('update',function(next) {
    this.model('User').update(
        { },
        { "$pull": { "joinedrooms": this._id } },
        { "multi": true },
        next
    );
})


module.exports = mongoose.model('Chatroom',chatroom);