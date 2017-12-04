import mongoose from 'mongoose';

const AppSchema = new mongoose.Schema({
  name: String,
  description: String,
  app_icon: String,
  app_banner: String,
  min_os_version: String,
  version: { type: mongoose.Schema.Types.ObjectId, ref: 'Version', required: true },
  // Foreign Keys: One to Many
  appDownloads: [{ type: mongoose.Schema.Types.ObjectId, ref: 'InstalledApp', required: false }],
  appRatings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'AppRating', required: false }],
  publishReviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PublishReview', required: false }],
  appCategory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'AppCategory', required: false }],
}, {
  timestamps: true,
});

mongoose.model('App', AppSchema);

export default mongoose.model('App', AppSchema);
