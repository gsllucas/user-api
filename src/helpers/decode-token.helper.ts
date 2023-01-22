import jwt from 'jsonwebtoken';

interface UserDecoded {
  user: {
    id: string;
    name: string;
    email: string;
  };
  iat: number;
  exp: number;
}

export default class DecodeTokenHelper {
  constructor() {}

  static decode(bearer: string) {
    const token = bearer.split(' ')[1];
    return jwt.decode(token) as UserDecoded;
  }
}
