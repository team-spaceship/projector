import mongoose from 'mongoose';

const AppSchema = new mongoose.Schema({
  name: String,
  featured: Boolean,
  versions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Version', required: true }],
  app_category: [{ type: mongoose.Schema.Types.ObjectId, ref: 'AppCategory', required: false }],
}, {
  timestamps: true,
});

mongoose.model('App', AppSchema);

export default mongoose.model('App', AppSchema);
