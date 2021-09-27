
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate')

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  adminID: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['approved', 'disapproved', 'pending'],
    default: 'pending',
  },
  price: {
    type: Number,
  },
  cost: {
    type: Number,
    required: true
  }
},
{
  timestamps: true,
});


productSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Product', productSchema);