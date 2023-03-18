import jwt, { JwtPayload } from 'jsonwebtoken';
import 'dotenv/config';

const TOKEN_STRING = process.env.TOKEN_STRING;

export default (context: { req: { headers: { authorization: any } } }) => {
  // context.req = { ... headers }
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    // Bearer ....
    const token = authHeader.replace('Bearer', '');
    if (token) {
      try {
        // userPayload
        return jwt.verify(token, 'TOKEN_STRING') as JwtPayload;
      } catch (err) {
        // Invalid/Expired token
        return null;
      }
    }
  }

  return null;
};
