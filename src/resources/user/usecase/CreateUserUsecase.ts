import UserEntity from '../entities/UserEntity';
import { validate } from 'email-validator';
import { CreateUserUsecaseError } from '../errors/CreateUserErrors';

export default class CreateUserUsecase {
  constructor() {}

  execute({
    name,
    email,
    password,
  }: UserEntity): CreateUserUsecaseError | UserEntity {
    if (!email || !name || !password) {
      return new CreateUserUsecaseError('No user was provided');
    }

    if (!validate(email)) {
      return new CreateUserUsecaseError('E-mail is not valid');
    }

    if (password.length <= 3) {
      return new CreateUserUsecaseError('Password is too short');
    }

    return new UserEntity(name, email, password);
  }
}
