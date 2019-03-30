const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: { type: String, required: true },
  organization: { type: String, required: true },
  area: { type: String, required: true },
  students: { type: Number, required: true },
  hours: { type: Number, required: true }
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
