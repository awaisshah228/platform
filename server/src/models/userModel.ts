import mongoose from "mongoose";
import bcrypt from "bcrypt";

// An interface that describes the properties
// that are requried to create a new User
interface UserAttrs {
  name: string;
  account: string;
  password: string;
}

// An interface that describes the properties
// that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the properties
// that a User Document has
interface UserDoc extends mongoose.Document {
  name: string;
  account: string;
  password: string;
  avatar: string;
  role: string;
  type: string;
  activated: boolean;
  rf_token: string;
}
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add your name"],
      trim: true,
      maxLength: [20, "Your name is up to 20 chars long."],
    },
    account: {
      type: String,
      required: [true, "Please add your email or phone"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add your password"],
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png",
    },
    role: {
      type: String,
      default: "user", // admin
    },
    type: {
      type: String,
      default: "register", // login
    },
    activated:{
      type : Boolean,
      default : false
    } ,
    rf_token: { type: String, select: false },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);
userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await bcrypt.hash(this.get("password"), 12);

    //   const hashed = await Password.toHash(this.get('password'));
    this.set("password", hashed);
  }
  done();

});
// userSchema.pre("update", async function (done) {
//   if (this.isModified("password")) {
//     const hashed = await bcrypt.hash(this.get("password"), 12);

//     //   const hashed = await Password.toHash(this.get('password'));
//     this.set("password", hashed);
//   }
//   done();
// });

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

// export default mongoose.model<>('user', userSchema)
export { User };
