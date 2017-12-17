import mongoose from 'mongoose';

const PublishReview = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: String,
  comment: String,
  version: { type: mongoose.Schema.Types.ObjectId, ref: 'Version', required: true },
}, {
  timestamps: true,
});

mongoose.model('PublishReview', PublishReview);

export default mongoose.model('PublishReview', PublishReview);
