import mongoose from 'mongoose';

const GuestSchema = new mongoose.Schema({
  credentials: {
    required: true,
    type: Object
  },
  info: {
    required: true,
    type: Object
  }
});

export default mongoose.model('Guests', GuestSchema, 'guests');
