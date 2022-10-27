"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Nonce = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const nonceSchema = new mongoose_1.default.Schema({
    address: {
        type: String,
        required: [true, "Please add your category"],
    },
    nonce: {
        type: String,
        required: [true, "Please add your category"],
    },
    createdAt: { type: Date, expires: '5m', default: Date.now }
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
nonceSchema.statics.build = (attrs) => {
    return new Nonce(attrs);
};
const Nonce = mongoose_1.default.model("Nonce", nonceSchema);
exports.Nonce = Nonce;
