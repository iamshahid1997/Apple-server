import User from '../../models/Users';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import generateToken from '../../utils/generateToken';

export default {
  Query: {
    async user(_: any, { ID }: any) {
      const user = await User.findById(ID);
      if (!user) {
        return null;
      }
      return user;
    },
  },
  Mutation: {
    async registerUser(
      _: any,
      { registerInput: { username, email, password } }: any
    ) {
      // See if an old user exits with email attempting to register
      const oldUser = await User.findOne({ email });

      // Throw error if that user exists
      if (oldUser) {
        return {
          code: 403,
          success: false,
          message: `A user is already registered with ${email}.`,
          user: oldUser,
        };
      }
      // Encrypt password
      let encryptedPassword = await bcrypt.hash(password, 10);

      // Build out mongoose model
      const newUser = new User({
        username: username,
        email: email.toLowerCase(),
        password: encryptedPassword,
      });

      // Create our JWT(attach to our User model)
      const token = generateToken(newUser, email);

      newUser.token = token;

      // Save User in MongoDb
      const res = await newUser.save();

      return {
        code: 200,
        success: true,
        message: `Successfully Registered`,
        user: res,
      };
    },
    async loginUser(_: any, { loginInput: { email, password } }: any) {
      // See if a user exits with the email
      const user = await User.findOne({ email });
      console.log(email, password);

      if (!user) {
        return {
          code: 404,
          success: false,
          message: `User not found`,
          user: null,
        };
      }

      // Check if the entered password equals the encrypted password
      if (user && (await bcrypt.compare(password, user.password))) {
        // Create new token
        const token = jwt.sign(
          {
            user_id: user._id,
            email,
          },
          'TOKEN_STRING',
          {
            expiresIn: '2h',
          }
        );

        user.token = token;

        return {
          code: 200,
          success: true,
          message: `Successfully Logged In`,
          user: user,
        };
      } else {
        return {
          code: 401,
          success: false,
          message: `Incorrect Password`,
          user: null,
        };
      }
    },
  },
};
