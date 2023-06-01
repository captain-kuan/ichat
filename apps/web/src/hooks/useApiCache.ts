import type { Response } from "@ichat/types"
import { isPromise } from "@/utils"

let memoryStorage: MemoryStorage
class MemoryStorage implements Storage {
  [name: string]: any
  length: number = 0
  data: Record<string, string> = {}
  constructor() {
    if (memoryStorage) return memoryStorage
    memoryStorage = this
  }
  clear(): void {
    this.data = {}
  }
  getItem(key: string): string | null {
    return this.data[key]
  }
  key(index: number): string | null {
    const keys = Object.keys(this.data)
    const key = keys[index * 1 || 0]
    return this.getItem(key)
  }
  removeItem(key: string): void {
    delete this.data[key]
  }
  setItem(key: string, value: string): void {
    this.data[key] = value
  }
}

type Api = (...args: any) => Promise<Response>
interface UseApiCacheOption {
  storage: Storage
  shouldRefresh: () => boolean
}

export function useApiCache<T extends Api>(
  api: T,
  {
    storage = new MemoryStorage(),
    shouldRefresh = () => false
  }: Partial<UseApiCacheOption> = {
    storage: new MemoryStorage(),
    shouldRefresh: () => false
  }
) {
  return (...args: any): ReturnType<T> => {
    const cacheKey = `${api.name}-${JSON.stringify(args)}`
    const cacheStr = storage.getItem(cacheKey)
    if (cacheStr && !shouldRefresh()) return JSON.parse(cacheStr)
    const res = callOnceAtSameTime(api)(...args)
    return isPromise(res)
      ? (res.then(res => {
          if (res?.code == 0) {
            !cacheStr && storage.setItem(cacheKey, JSON.stringify(res))
          }
          return res
        }) as ReturnType<T>)
      : res
  }
}
const callOnceResMap: Map<Function, Map<string, Promise<any>>> = new Map()

export function callOnceAtSameTime<T extends (...args: any) => Promise<any>>(
  api: T
) {
  return (...args: any): ReturnType<T> => {
    const resMap = callOnceResMap.get(api) || new Map()
    const cache = resMap.get(JSON.stringify(args))
    if (cache != null) return cache
    const res = api(...args)
    if (isPromise(res)) {
      res.then(res => {
        resMap.delete(JSON.stringify(args))
        return res
      })
      resMap.set(JSON.stringify(args), res)
      callOnceResMap.set(api, resMap)
    }
    return res as ReturnType<T>
  }
}
