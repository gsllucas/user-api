abstract class CreateUserError extends Error {}

export class CreateUserUsecaseError extends CreateUserError {
  constructor(message: string) {
    super(message);
  }
}
