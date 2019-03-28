const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  hours: { type: Number, required: true }
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
