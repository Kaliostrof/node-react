const mongoose = require("mongoose");

const AppointmentSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  problemDescription: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

const Appointment = mongoose.model("Appointment", AppointmentSchema);

module.exports = Appointment;
