
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common'

import { Request, Response } from 'express'
import { ErrorResponse } from '@/types'
@Catch(HttpException)
export class HttpErrorFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const request = ctx.getRequest<Request>()
        const response = ctx.getResponse<Response>()
        const status = exception.getStatus()
        const res: ErrorResponse = {
            msg: exception.message,
            time: new Date().getTime(),
            path: request.url,
            code: status
        }
        response.status(status === 401 ? 401 : 200).json(res)
    }
}