import { model, Schema } from 'mongoose';

const UserSchema = new Schema({
  username: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  token: { type: String },
});

const User = model('User', UserSchema);
export default User;
