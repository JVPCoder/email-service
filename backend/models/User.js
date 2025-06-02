import { Schema, model } from 'mongoose';
import Counter from './Counter.js';

const userSchema = new Schema({
  id: { type: Number, unique: true },
  nome: { type: String, required: true, maxlength: 255 },
  email: { type: String, required: true, unique: true, maxlength: 255 },
  senha: { type: String, required: true, minlength: 8, maxlength: 255 }
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (this.isNew) {
    const counter = await Counter.findByIdAndUpdate(
      { _id: 'userId' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.id = counter.seq;
  }
  next();
});

export default model('User', userSchema);
