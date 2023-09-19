import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required: [true, "Please provide email"],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Invalid email",
    ],
  },
  phoneNumber: {
    type: String,
    trim: true,
    required: [true, "Please provide phone number"],
    unique: true,
    match: [/^[^A-Za-z]*$/g, "Invalid phone number"],
  },
  firstName: {
    type: String,
    required: [true, "Please provide first name"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Please provide last name"],
    trim: true,
  },
  country: {
    type: String,
    required: [true, "Please provide country"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    trim: true,
    minLength: [
      8,
      "The value of path `{PATH}` (`{VALUE}`) is shorter than the minimum allowed length ({MINLENGTH}).",
    ],
  },
});

// Setup bcryptjs for password hashing
UserSchema.pre("save", async function () {
  let salt = await bcryptjs.getSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
});

// Setup document method for password validation
UserSchema.methods.validatePassword = async function (inputPassword) {
  return await bcryptjs.compare(inputPassword, this.password);
};

// Setup jwt for token management
UserSchema.methods.generateToken = function ({ userId, email, phoneNumber }) {
  let token = jwt.sign({ userId, email, phoneNumber }, process.env.JWT_SECRET, {
    issuer: process.env.ISSUER,
  });
  return token;
};

const User = mongoose.model("Users", UserSchema);

export default User;
