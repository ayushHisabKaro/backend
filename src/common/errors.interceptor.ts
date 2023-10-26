import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MULTER_ERROR_MESSAGE } from 'src/file/file.controller';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  classValidatorSimplifyMessage(message: ValidationError): string[] {
    const messageArray: string[] = [];
    if (message.constraints) {
      const constraints = message.constraints;
      Object.keys(constraints).map((k) => {
        const message = constraints[k];
        messageArray.push(message);
        console.log(message);
        return message;
      });
    } else {
      message.children.forEach((message) => {
        this.classValidatorSimplifyMessage(message).forEach((message) => {
          messageArray.push(message);
        });
      });
    }
    return messageArray;
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) =>
        throwError(() => {
          try {
            if (error.message === MULTER_ERROR_MESSAGE) {
              throw new BadRequestException('Only images/pdfs are allowed');
            }
            const validationError = error.response;
            if (
              validationError &&
              validationError.statusCode === 400 &&
              validationError.message &&
              validationError.message[0].target
            ) {
              // console.log(typeof error);
              // console.log(validationError);
              error.response.classValidatorMessage = error.response.message;
              validationError.message.forEach((message) => {
                error.response.message =
                  this.classValidatorSimplifyMessage(message);
              });
            }

            throw error;
          } catch (error) {
            throw error;
          }
        }),
      ),
    );
  }
}
