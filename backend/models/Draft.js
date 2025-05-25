import { Schema, model } from 'mongoose';

const draftSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User.js', required: true },
  assunto: { type: String, maxlength: 255 },
  emailDestinatario: {
    type: String,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  },
  corpo: { type: String }
}, { timestamps: true });

export default model('Draft.js', draftSchema);
