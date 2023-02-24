import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'
import { Request } from "express"
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...')
    const req = context.switchToHttp().getRequest<Request>()
    console.log({ url: req.originalUrl, params: req.params, body: req.body, req: req.headers });

    const now = Date.now()
    return next
      .handle()
      .pipe(
        tap((res) => {
          console.log(`After... ${Date.now() - now}`)
          console.log(res);
        })
      )
  }
}
