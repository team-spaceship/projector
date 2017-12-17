import mongoose from 'mongoose';

const InstalledVersionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  version: { type: mongoose.Schema.Types.ObjectId, ref: 'Version', required: true },
}, {
  timestamps: true,
});

mongoose.model('InstalledVersion', InstalledVersionSchema);

export default mongoose.model('InstalledVersion', InstalledVersionSchema);
