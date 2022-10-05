import mongoose from "mongoose";
interface NonceAttrs {
  address: string;
  nonce: string;
}

// An interface that describes the properties
// that a User Model has
interface NonceModel extends mongoose.Model<NonceDoc> {
  build(attrs: NonceAttrs): NonceDoc;
}

// An interface that describes the properties
// that a User Document has
interface NonceDoc extends mongoose.Document {
  address: string;
  nonce: string;
}

const nonceSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: [true, "Please add your category"],
    },
    nonce: {
      type: String,
      required: [true, "Please add your category"],
    },
    createdAt: { type: Date, expires: '5m', default: Date.now }
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
nonceSchema.statics.build = (attrs: NonceAttrs) => {
  return new Nonce(attrs);
};

const Nonce = mongoose.model<NonceDoc, NonceModel>(
  "Nonce",
  nonceSchema
);

export  { Nonce };
 