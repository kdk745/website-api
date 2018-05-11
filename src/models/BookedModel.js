import mongoose from 'mongoose';

const BookedSchema = new mongoose.Schema({
  bookings: {
    required: true,
    type: Object
  },
  userID: {
    required: true,
    type: String
  },
  waitTime: {
    required: false,
    type: String
  }
});

export default mongoose.model('Booked', BookedSchema, 'booked');
