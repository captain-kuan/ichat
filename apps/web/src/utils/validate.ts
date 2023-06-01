export function isObject(val: unknown): val is Record<string, any> {
  return val !== null && typeof val === 'object';
}

export function isFunction(val: unknown): val is Function {
  return typeof val === 'function';
}

export function isPromise<T = any>(val: unknown): val is Promise<T> {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch);
}
