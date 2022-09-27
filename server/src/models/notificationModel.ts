import mongoose from "mongoose";
interface NotificationAttrs {
        user: string
        recipients: []
        url: string
        text: string
        content: string
        image: string
        isRead: string
}

// An interface that describes the properties
// that a User Model has
interface NotificatonModel extends mongoose.Model<NotificationDoc> {
  build(attrs: NotificationAttrs): NotificationDoc;
}

// An interface that describes the properties
// that a User Document has
interface NotificationDoc extends mongoose.Document {
  name: string;
}

const notificationSchema = new mongoose.Schema(
  {
    id: mongoose.Types.ObjectId,
        user: {type: mongoose.Types.ObjectId, ref: 'user'},
        recipients: [mongoose.Types.ObjectId],
        url: String,
        text: String,
        content: String,
        image: String,
        isRead: {type: Boolean, default: false}
   
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        // console.log(doc)
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);
notificationSchema.statics.build = (attrs: NotificationAttrs) => {
  return new Notification(attrs);
};

const Notification = mongoose.model<NotificationDoc, NotificatonModel>(
  "Notification",
  notificationSchema
);

export  { Notification };
 




// const mongoose = require('mongoose')

// const notifySchema = new mongoose.Schema({
//     id: mongoose.Types.ObjectId,
//     user: {type: mongoose.Types.ObjectId, ref: 'user'},
//     recipients: [mongoose.Types.ObjectId],
//     url: String,
//     text: String,
//     content: String,
//     image: String,
//     isRead: {type: Boolean, default: false}
// }, {
//     timestamps: true
// })

// module.exports = mongoose.model('notify', notifySchema)