import { IHandler, Predicate, Selector } from "./types";

export class ValidatorHandler<T, Key> implements IHandler<T> {
  private next?: IHandler<T>;
  private readonly selector: Selector<T, Key>;
  private readonly predicate: Predicate<Key>;

  constructor(selector: Selector<T, Key>, predicate: Predicate<Key>) {
    this.selector = selector;
    this.predicate = predicate;
  }

  handle(value: T): boolean {
    const isValid = this.predicate(this.selector(value));
    if (isValid && this.next) {
      return this.next.handle(value);
    }

    return isValid;
  }

  setNext(handler: IHandler<T>): void {
    this.next = handler;
  }
}
