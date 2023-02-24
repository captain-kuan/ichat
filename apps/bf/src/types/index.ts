

export interface Response<T> {
    data?: T;
    code: number
    message: string,
    success: boolean

}
export interface ErrorResponse extends Response<void> {
    time?: number
    path?: string
}