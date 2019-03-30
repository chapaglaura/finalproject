const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const supervisorSchema = new Schema({
  name: { type: String, required: true },
  project: Schema.Types.ObjectId,
  username: { type: String, required: true },
  userID: Schema.Types.ObjectId
});

const Supervisor = mongoose.model("Supervisor", supervisorSchema);

module.exports = Supervisor;
