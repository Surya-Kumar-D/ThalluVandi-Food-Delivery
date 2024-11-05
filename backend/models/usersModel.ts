import mongoose, { Document } from "mongoose";
import validator from "validator";
import { type Iuser } from "../types/types.ts";

const userSchema = new mongoose.Schema<Iuser>({
  name: {
    type: String,
    required: [true, "User name is requried"],
  },
  slug: String,
  email: {
    type: String,
    required: [true, "Email is required"],
    validate: [validator.isEmail, "Please provide the valid email"],
    unique: true,
    lowercase: true,
  },
  role: {
    type: String,
    enum: ["customer", "admin"],
    default: "customer",
  },
  password: {
    type: String,
    requrired: [true, "Please provide the password"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: "passwords must match",
    },
  },
});

export default mongoose.model("User", userSchema);
