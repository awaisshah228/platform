import mongoose from "mongoose";
interface ContactAttrs {
  name: string;
  email: string;
  message: string;
}

// An interface that describes the properties
// that a User Model has
interface ContactModel extends mongoose.Model<ContactDoc> {
  build(attrs: ContactAttrs): ContactDoc;
}

// An interface that describes the properties
// that a User Document has
interface ContactDoc extends mongoose.Document {
  name: string;
  email: string;
  message: string;
}

const ContactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add your Contact"],
      trim: true,
      unique: true,
      maxLength: [50, "Name is up to 50 chars long."],
    },
    email: {
      type: String,
      required: [true, "Please add your Contact"],
      trim: true,
      unique: true,
      maxLength: [50, "Name is up to 50 chars long."],
    },
    message: {
      type: String,
      required: [true, "Please add your Contact"],
      trim: true,
      unique: true,
      maxLength: [50, "Name is up to 50 chars long."],
    },
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
ContactSchema.statics.build = (attrs: ContactAttrs) => {
  return new Contact(attrs);
};

const Contact = mongoose.model<ContactDoc, ContactModel>(
  "Contact",
  ContactSchema
);

export  { Contact };
 