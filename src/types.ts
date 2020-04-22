
export interface IHandler<T> {
  setNext(handler: IHandler<T>): void;
  handle(value: T): boolean;
}

export type Selector<T, Key> = (o: T) => Key;
export type Predicate<T> = (o: T) => boolean;
