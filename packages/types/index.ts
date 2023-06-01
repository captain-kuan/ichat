export * from "./message"
export * from "./chat"
export * from "./user"
export interface Response<T=any> {
    data?: T,
    code: number,
    msg: string
}
