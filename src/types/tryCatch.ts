export type TryCatchSuccess<T> = {
  data: T;
  error: null;
}

export type TryCatchError<E> ={
  data: null;
  error: E;
}

export type TryCatch<T, E = Error> = TryCatchSuccess<T> | TryCatchError<E>;
