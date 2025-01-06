const mongoose = require('mongoose');

const PersonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  // gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  gender: { type: String, required: true },
  mobileNumber: { type: String, required: true }
});

module.exports = mongoose.model('Person', PersonSchema);
