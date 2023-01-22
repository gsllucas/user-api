import { validate } from 'email-validator';

export interface IEmailValidator {
  validate(email: string): boolean;
}

export default class EmailValidator implements IEmailValidator {
  validate = (email: string): boolean => validate(email);
}
