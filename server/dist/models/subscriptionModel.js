"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subscription = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const SubscriptionSchema = new mongoose_1.default.Schema({
    blog: {
        type: mongoose_1.default.Types.ObjectId, ref: "Blog"
    },
    user: {
        type: mongoose_1.default.Types.ObjectId, ref: "User"
    },
    block_number: { type: String }
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
SubscriptionSchema.statics.build = (attrs) => {
    return new Subscription(attrs);
};
const Subscription = mongoose_1.default.model("Subscription", SubscriptionSchema);
exports.Subscription = Subscription;
