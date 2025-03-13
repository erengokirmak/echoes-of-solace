import mongoose from "mongoose";
import validator from "validator";

const UserSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "User must have a username"]
    },
    email: {
      type: String,
      required: [true, "User must have an email"],
      validate: {
        validator: email => validator.isEmail(email),
        message: input => `${input} must be an email`
      }
    },
    // This will be the hashed+salted output
    password: {
      type: String,
      required: [true, "User must have a password"]
    },
  },
  {
    timestamps: true
  }
)

const User = mongoose.model("User", UserSchema)

export default User