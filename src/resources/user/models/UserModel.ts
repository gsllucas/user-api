import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true, select: false },
  },
  {
    toJSON: {
      transform: (_, ret): void => {
        (ret.id = ret._id), delete ret._id, delete ret.__v, delete ret.password;
      },
    },
  }
);

const UserModel = mongoose.model('Users', UserSchema);

export default UserModel;
