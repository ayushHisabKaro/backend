import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { Observable } from 'rxjs';
export declare class ErrorsInterceptor implements NestInterceptor {
    classValidatorSimplifyMessage(message: ValidationError): string[];
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
