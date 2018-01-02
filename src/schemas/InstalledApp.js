import mongoose from 'mongoose';

const InstalledAppSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  app: { type: mongoose.Schema.Types.ObjectId, ref: 'App', required: true },
  version: String,
}, {
  timestamps: true,
});

mongoose.model('InstalledApp', InstalledAppSchema);

export default mongoose.model('InstalledApp', InstalledAppSchema);
