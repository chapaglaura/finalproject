const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  name: { type: String, required: true },
  university: { type: String, required: true },
  project: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  hours: { type: Number, default: 0 },
  checkIn: { type: Date },
  checkOut: { type: Date },
  userID: Schema.Types.ObjectId
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
