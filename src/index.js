require('dotenv').config();

const express = require('express');
const bookingTask = require('./cron/booking');

const app = express();

bookingTask();

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});