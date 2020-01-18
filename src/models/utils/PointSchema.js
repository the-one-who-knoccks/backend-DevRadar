const mongoose = require('mongoose');

const PointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    requrired: true,
  },
  coordinates: {
    type: [Number], // Long, Latitude
  },
});

module.exports = PointSchema