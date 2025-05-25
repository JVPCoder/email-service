import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  nome: { type: String, required: true, maxlength: 255 },
  email: { type: String, required: true, unique: true, maxlength: 255 },
  senha: { type: String, required: true, minlength: 8, maxlength: 255 }
}, { timestamps: true });

export default model('User.js', userSchema);
