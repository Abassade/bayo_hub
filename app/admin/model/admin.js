const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate')

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


adminSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Admin', adminSchema);