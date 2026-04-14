export type DeepWiden<T> =
  T extends string ? string
  : T extends number ? number
  : T extends boolean ? boolean
  : T extends readonly (infer U)[] ? readonly DeepWiden<U>[]
  : T extends object ? { [K in keyof T]: DeepWiden<T[K]> }
  : T;
