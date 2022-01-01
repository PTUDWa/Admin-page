const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },  
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/2206/2206368.png",
    },
    phoneNumber: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "admin",
    },
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
