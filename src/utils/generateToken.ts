import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
import 'dotenv/config';

const TOKEN_STRING = process.env.TOKEN_STRINGl;

export default (newUser: { _id: Types.ObjectId }, email: string) => {
  return jwt.sign(
    {
      user_id: newUser._id,
      email,
    },
    'TOKEN_STRING'
  );
};
