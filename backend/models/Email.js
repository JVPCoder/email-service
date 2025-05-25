import { Schema, model } from 'mongoose';

const emailSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  assunto: { type: String, required: true, maxlength: 255 },
  emailRemetente: { type: String, required: true },
  emailDestinatario: {
    type: String,
    required: true,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  },
  corpo: { type: String, required: true },
  status: { type: String, enum: ['enviado', 'lido'], default: 'enviado' },
  dataEnvio: { type: Date, default: Date.now }
});

export default model('Email', emailSchema);
