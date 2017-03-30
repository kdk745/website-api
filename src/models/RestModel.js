import mongoose from 'mongoose';

const RestSchema = new mongoose.Schema({
  credentials: {
    required: true,
    type: Object
  },
  info: {
    required: true,
    type: Object
  },
  booked: {
    required: true,
    type: Array
  }
});

export default mongoose.model('Rests', RestSchema, 'rests');
