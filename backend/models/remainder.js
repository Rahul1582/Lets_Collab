const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema({

    userid:[
        {
            type: mongoose.Schema.Types.ObjectID,
            ref: 'user',
        }
    ],

    Subject: {
        type: String,
        required: true,
      },
      StartTime: {
        type: Date,
      },
      EndTime: {
        type: Date,
      },
      Description: {
        type: String,
      },
      isAllDay: {
        type: Boolean,
      },
      mailSent : {
        type:Boolean ,
        default: false ,
      }

    },
    {
        timestamps: true, 
    }
);

module.exports = mongoose.model('remainder',remainder);