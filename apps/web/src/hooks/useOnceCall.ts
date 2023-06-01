const calledMap = new Map<Function, any>();
const proxyMap = new Map<Function, Function>();

export function useOnceCall(fn: Function) {
  const hasProxy = proxyMap.has(fn);
  const proxy = hasProxy
    ? proxyMap.get(fn)
    : new Proxy(fn, {
        apply(target, thisArg, argArray) {
          if (calledMap.has(proxy)) return calledMap.get(proxy);
          const res = Reflect.apply(target, thisArg, argArray);
          calledMap.set(proxy, res);
          return res
        },
      });
  !hasProxy && proxyMap.set(fn, proxy);
  return proxy;
}
