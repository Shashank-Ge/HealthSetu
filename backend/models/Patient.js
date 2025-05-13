const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    profileImage: {
      type: String,
      default: null
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "patient",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Patient", patientSchema);
