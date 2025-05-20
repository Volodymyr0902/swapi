import {CallHandler, ExecutionContext, Injectable, NestInterceptor, StreamableFile} from '@nestjs/common';
import {map, Observable} from 'rxjs';
import {AnyResponse} from "../types/any-response.type";
import {FinalPayload} from "../types/final-payload.type";


@Injectable()
export class GeneralResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<FinalPayload> {
      return next.handle().pipe(
          map((res: AnyResponse): FinalPayload => (res instanceof StreamableFile ? res : {data: res})),
      );
  }
}
