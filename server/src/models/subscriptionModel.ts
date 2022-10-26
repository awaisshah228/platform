import mongoose from "mongoose";
interface SubscriptionAttrs {
  address: string;
  Subscription: string;
}

// An interface that describes the properties
// that a User Model has
interface SubscriptionModel extends mongoose.Model<SubscriptionDoc> {
  build(attrs: SubscriptionAttrs): SubscriptionDoc;
}

// An interface that describes the properties
// that a User Document has
interface SubscriptionDoc extends mongoose.Document {
  address: string;
  Subscription: string;
}

const SubscriptionSchema = new mongoose.Schema(
  {
    blog: {
        type: mongoose.Types.ObjectId, ref: "Blog"
    },
    user: {
        type: mongoose.Types.ObjectId, ref: "User"
    },
    block_number: { type: String }
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
SubscriptionSchema.statics.build = (attrs: SubscriptionAttrs) => {
  return new Subscription(attrs);
};

const Subscription = mongoose.model<SubscriptionDoc, SubscriptionModel>(
  "Subscription",
  SubscriptionSchema
);

export  { Subscription };
 