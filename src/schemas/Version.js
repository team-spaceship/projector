import mongoose from 'mongoose';

const VersionSchema = new mongoose.Schema({
  version: String,
  path: String,
  app: { type: mongoose.Schema.Types.ObjectId, ref: 'App', required: true },
}, {
  timestamps: true,
});

mongoose.model('Version', VersionSchema);

export default mongoose.model('Version', VersionSchema);
