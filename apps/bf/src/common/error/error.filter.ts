
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
            message: exception.message,
            time: new Date().getTime(),
            success: false,
            path: request.url,
            code: status
        }
        response.status(status).json(res)
    }
}