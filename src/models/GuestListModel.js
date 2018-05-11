import mongoose from 'mongoose';

const GuestListSchema = new mongoose.Schema({
  _list: {
    required: true,
    type: Object
  }
});

export default mongoose.model('GuestLists', GuestListSchema, 'guestlists');
