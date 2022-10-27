"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notification = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const notificationSchema = new mongoose_1.default.Schema({
    id: mongoose_1.default.Types.ObjectId,
    user: { type: mongoose_1.default.Types.ObjectId, ref: 'user' },
    recipients: [mongoose_1.default.Types.ObjectId],
    url: String,
    text: String,
    content: String,
    image: String,
    isRead: { type: Boolean, default: false }
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            // console.log(doc)
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        },
    },
});
notificationSchema.statics.build = (attrs) => {
    return new Notification(attrs);
};
const Notification = mongoose_1.default.model("Notification", notificationSchema);
exports.Notification = Notification;
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
