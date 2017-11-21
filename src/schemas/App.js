import mongoose from 'mongoose';

const AppSchema = new mongoose.Schema({
  name: String,
  description: String,
  app_icon: String,
  app_banner: String,
  min_os_version: String,
  version: String,
}, {
  timestamps: true,
});

mongoose.model('App', AppSchema);

export default mongoose.model('App', AppSchema);
