import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { map, Observable } from 'rxjs';

export function Serialize(returnType: ClassConstructor<any>) {
  return UseInterceptors(new SerializeInterceptor(returnType));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private readonly returnType: ClassConstructor<any>) {}

  intercept(_: ExecutionContext, next: CallHandler<any>): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        return plainToClass(this.returnType, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
