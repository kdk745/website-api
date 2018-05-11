import mongoose from 'mongoose';
const RestSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String
  },
  address: {
    required: true,
    type: String
  },
  info: {
    required: false,
    type: String
  },
  userID: {
    required: true,
    type: String
  }
});

export default mongoose.model('Rests', RestSchema, 'rests');
