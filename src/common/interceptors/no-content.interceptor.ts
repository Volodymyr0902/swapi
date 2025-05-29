import {CallHandler, ExecutionContext, HttpException, HttpStatus, Injectable, NestInterceptor} from "@nestjs/common";
import {Observable, tap} from "rxjs";
import {AnyResponse} from "../types/any-response.type";

@Injectable()
export class NoContentInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<AnyResponse> {
        return next.handle().pipe(
            tap((resValue: AnyResponse) => {
                if (Array.isArray(resValue) && resValue.length === 0) {
                    throw new HttpException('', HttpStatus.NO_CONTENT);
                }
                return resValue;
            }),
        );
    }
}