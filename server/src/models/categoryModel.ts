import mongoose from "mongoose";
interface CategoryAttrs {
  name: string;
}

// An interface that describes the properties
// that a User Model has
interface CategoryModel extends mongoose.Model<CategoryDoc> {
  build(attrs: CategoryAttrs): CategoryDoc;
}

// An interface that describes the properties
// that a User Document has
interface CategoryDoc extends mongoose.Document {
  name: string;
}

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add your category"],
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
categorySchema.statics.build = (attrs: CategoryAttrs) => {
  return new Category(attrs);
};

const Category = mongoose.model<CategoryDoc, CategoryModel>(
  "Category",
  categorySchema
);

export  { Category };
 