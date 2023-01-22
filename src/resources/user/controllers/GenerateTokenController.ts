import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { compare } from 'bcrypt';
import UserModel from '../models/UserModel';

export default class GenerateTokenController {
  constructor() {}

  async generate(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email }).select('+password');

    if (!user || !(await compare(password, user.password!))) {
      return res
        .status(404)
        .send({ error: 'Please, insert a valid credential' });
    }

    const token = jwt.sign({ user }, process.env.JWT_SECRET!, {
      expiresIn: 86400,
    });

    return res.status(200).send({ user, token });
  }
}
