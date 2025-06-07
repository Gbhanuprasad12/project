const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  contact: String,
});

module.exports = mongoose.model("Patient", PatientSchema);
