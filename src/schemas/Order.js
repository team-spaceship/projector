import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  date: Date,
});

mongoose.model('Order', OrderSchema);

export default mongoose.model('Order', OrderSchema);
