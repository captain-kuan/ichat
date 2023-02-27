export * from "./message"
export * from "./user"

export interface Response<T> {
    data?: T,
    code: number,
    msg: string
}