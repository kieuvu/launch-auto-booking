const schedule = require('node-schedule');
const bookingTask = require('../tasks/booking');

const bookingSchedule = (id, pass, day) => {
  const bookingTime = "00 09 * *";

  schedule.scheduleJob(`${bookingTime} ${day}`, async () => {
    await bookingTask(id, pass);
  });
};

const cron = async () => {
  bookingSchedule(process.env.ID_1, process.env.PASSWORD_1, process.env.DAY_1);
  bookingSchedule(process.env.ID_2, process.env.PASSWORD_2, process.env.DAY_2);
};

module.exports = cron;