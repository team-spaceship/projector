import mongoose from 'mongoose';

const VersionRating = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  version: { type: mongoose.Schema.Types.ObjectId, ref: 'Version', required: true },
  title: String,
  rating: Number,
  comment: String,
}, {
  timestamps: true,
});

mongoose.model('VersionRating', VersionRating);

export default mongoose.model('VersionRating', VersionRating);
