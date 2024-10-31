const chalk = require("chalk");
const Appointment = require("./models/Appointment");

async function getAppointments() {
  const appointments = await Appointment.find();
  return appointments;
}

async function addAppointment(message) {
  const { fullName, phoneNumber, problemDescription } = message;
  console.log("add:", fullName, phoneNumber, problemDescription);
  const date =
    new Date().toLocaleTimeString() + " " + new Date().toLocaleDateString();
  await Appointment.create({ fullName, phoneNumber, problemDescription, date });

  console.log(chalk.bgBlue("Appointment created!"));
}

module.exports = {
  addAppointment,
  getAppointments,
};
