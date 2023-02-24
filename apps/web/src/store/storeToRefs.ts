import { StoreGeneric, storeToRefs as _storeToRefs } from 'pinia'
type FilterOptional<S, T> = Pick<
    S,
    {
        [K in keyof S]: S[K] extends T ? K : never
    }[keyof S]
>
export function storeToRefs<S extends StoreGeneric>(
    store: S
): ReturnType<typeof _storeToRefs<S>> & FilterOptional<S, Function> {
    let res: any = {}
    for (const key in store) {
        if (Object.hasOwnProperty.call(store, key)) {
            if (typeof store[key] === 'function') {
                res[key] = store[key] 
            }
        }
    }
    let data = _storeToRefs(store)
    
    Object.assign(res, data)
    return res
}
