const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const checkInSchema = new Schema({
  student: { type: String, required: true },
  date: { type: Date, required: true },
  project: { type: String, default: "", required: true },
  studentID: { type: String, required: true }
});

const checkIn = mongoose.model("CheckIn", checkInSchema);

module.exports = checkIn;
