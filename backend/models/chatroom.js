const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatbody = {
  userid: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  }
};

const chatroom = new Schema(
  {
    title: {
      type: String,
      required: true
    },

    msgarray: {
      type: [chatbody]
    },

    joinedusers: [
      {
        type: mongoose.Schema.Types.ObjectID,
        ref: "User"
      }
    ],

    lastmsg: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Chatroom", chatroom);
