import mongoose from 'mongoose';

const UserIp = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  ip: String,
}, {
  timestamps: true,
});

mongoose.model('UserIp', UserIp);

export default mongoose.model('UserIp', UserIp);
