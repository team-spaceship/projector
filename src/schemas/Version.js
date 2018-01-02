import mongoose from 'mongoose';

const VersionSchema = new mongoose.Schema({
  version: String,
  description: String,
  version_path: String,
  version_note: String,
  app: { type: mongoose.Schema.Types.ObjectId, ref: 'App', required: true },
  version_installs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'InstalledVersion', required: false }],
  version_ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'VersionRating', required: false }],
  publish_reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PublishReview', required: false }],
}, {
  timestamps: true,
});

mongoose.model('Version', VersionSchema);

export default mongoose.model('Version', VersionSchema);
