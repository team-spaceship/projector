import mongoose from 'mongoose';

const AppCategorySchema = new mongoose.Schema({
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  app: { type: mongoose.Schema.Types.ObjectId, ref: 'App', required: true },
}, {
  timestamps: true,
});

mongoose.model('AppCategory', AppCategorySchema);

export default mongoose.model('AppCategory', AppCategorySchema);
