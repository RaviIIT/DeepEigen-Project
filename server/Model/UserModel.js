const mongoose = require("mongoose");

//schema design
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required and should be unique"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
  },
  { timestamps: true }
);

//export
const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;
