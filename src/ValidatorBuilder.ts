import { IHandler, Predicate, Selector } from "./types";
import { ValidatorHandler } from "./ValidatorHandler";
import { Validator } from "./Validator";

interface IValidatorBuilder<T> {
  addValidation<Key>(selector: Selector<T, Key>, predicate: Predicate<Key>): IValidatorBuilder<T>;
}

export class ValidatorBuilder<T> implements IValidatorBuilder<T> {
  private chainHead?: IHandler<T>;
  private lastHandler?: IHandler<T>;

  getValidator() {
    if (!this.chainHead) {
      throw new Error('Validator must have at least one handler');
    }

    return new Validator(this.chainHead);
  }

  addValidation<Key>(selector: Selector<T, Key>, predicate: Predicate<Key>): IValidatorBuilder<T> {
    const handler = new ValidatorHandler(selector, predicate);

    if (!this.chainHead) {
      this.chainHead = handler;
    } else if (this.lastHandler) {
      this.lastHandler.setNext(handler);
    }

    this.lastHandler = handler;

    return this;
  }
}
