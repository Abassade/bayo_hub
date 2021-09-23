const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['super-admin', 'admin', 'user-admin'],
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    minlength: 7,
    required: true
  }
},
{
  timestamps: true,
});

module.exports = mongoose.model('Admin', adminSchema);