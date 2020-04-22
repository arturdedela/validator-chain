import { IHandler } from "./types";

export class Validator<T> {
  constructor(private readonly handler: IHandler<T>) {}

  validate(value: T) {
    const isValid = this.handler.handle(value);
    if (!isValid) {
      throw new Error('Validation not passed')
    }
  }
}
