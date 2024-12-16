import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImage: {
      data: Buffer,
      contentType: String,
      enum: ['image/jpeg', 'image/png'],
    },
    role: { type: String, default: 'user' },
    refreshToken: { type: String },
    isBlocked: { type: String, default: 'Unblocked' },
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
