export type UnifyIntersection<T> = {
  [K in keyof T]: T[K];
} & unknown;
