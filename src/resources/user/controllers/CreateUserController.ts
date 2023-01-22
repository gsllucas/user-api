import { Request, Response } from 'express';
import CreateUserUsecase from '../usecase/CreateUserUsecase';
import UserModel from '../models/UserModel';
import { CreateUserUsecaseError } from '../errors/CreateUserErrors';
import { hash } from 'bcrypt';
import UserEntity from '../entities/UserEntity';
import { v4 as uuid } from 'uuid';

export default class CreateUserController {
  constructor() {}

  async create(req: Request, res: Response) {
    console.log(req.body);
    const { name, email, password } = req.body;

    const userAlreadyExists = await UserModel.findOne({ email });

    if (userAlreadyExists) {
      return res.status(400).send({ error: 'E-mail already registered' });
    }

    const userEntity = new UserEntity(name, email, password);
    const usecase = new CreateUserUsecase().execute(userEntity);

    if (usecase instanceof CreateUserUsecaseError) {
      return res.status(400).send({
        error: usecase.message,
        type: 'CreateUserUsecaseError',
        status: 400,
      });
    }

    const encrypted = await hash(usecase.password, 10);

    const userModel = new UserModel({
      _id: uuid(),
      name: usecase.name,
      email: usecase.email,
      password: encrypted,
    });

    const result = await userModel.save();

    if (!result) {
      return res
        .status(400)
        .send({ error: 'It was not possible to create the user' });
    }

    return res.status(201).send({ data: result });
  }
}
