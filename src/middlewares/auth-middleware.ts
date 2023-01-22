import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res
      .status(401)
      .send({ error: 'No authorization token was provided' });
  }

  const parts = authorization.split(' ');

  if (parts.length !== 2) {
    return res.status(401).send({ error: 'Invalid format token' });
  }

  const [bearer, token] = parts;

  if (bearer !== 'Bearer') {
    return res.status(401).send({ error: 'Token badly formatted' });
  }

  jwt.verify(token, process.env.JWT_SECRET!, (error: any, _: any) => {
    if (error) {
      return res.status(401).send({ error });
    }

    return next();
  });
}
