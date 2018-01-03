import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  name: String,
  tag: String,
  // Foreign key: One to Many
  linked_apps: [{ type: mongoose.Schema.Types.ObjectId, ref: 'AppCategory', required: false }],
}, {
  timestamps: true,
});

mongoose.model('Category', CategorySchema);

export default mongoose.model('Category', CategorySchema);
