const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const appointmentSchema = mongoose.Schema({
  from: { type: Date, required: true },
  to: { type: Date, required: true },
  bigHall: { type: Boolean, required: true },
  table: { type: [Number], required: true },
  user: { type: ObjectId}
});

module.exports = mongoose.model('Appointment', appointmentSchema);