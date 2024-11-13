import mongoose from "mongoose";
import validator from "validator";
import { type Iuser } from "../types/types.ts";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema<Iuser>({
  name: {
    type: String,
    required: [true, "User name is required"],
  },

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
    required: [true, "Please provide the password"],
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
  photo: {
    type: String,
    default: "https://i.pravatar.cc/150?u=fake@pravatar.com",
  },
});

userSchema.pre("save", async function (next) {
  //only run this function if password was actually modified
  if (!this.isModified("password")) return next();
  //hash the password with the cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  //Delete the password Confirm
  this.passwordConfirm = undefined!;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

export default mongoose.model("User", userSchema);
