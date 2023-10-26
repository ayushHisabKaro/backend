"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorsInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const file_controller_1 = require("../file/file.controller");
let ErrorsInterceptor = class ErrorsInterceptor {
    classValidatorSimplifyMessage(message) {
        const messageArray = [];
        if (message.constraints) {
            const constraints = message.constraints;
            Object.keys(constraints).map((k) => {
                const message = constraints[k];
                messageArray.push(message);
                console.log(message);
                return message;
            });
        }
        else {
            message.children.forEach((message) => {
                this.classValidatorSimplifyMessage(message).forEach((message) => {
                    messageArray.push(message);
                });
            });
        }
        return messageArray;
    }
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.catchError)((error) => (0, rxjs_1.throwError)(() => {
            try {
                if (error.message === file_controller_1.MULTER_ERROR_MESSAGE) {
                    throw new common_1.BadRequestException('Only images/pdfs are allowed');
                }
                const validationError = error.response;
                if (validationError &&
                    validationError.statusCode === 400 &&
                    validationError.message &&
                    validationError.message[0].target) {
                    error.response.classValidatorMessage = error.response.message;
                    validationError.message.forEach((message) => {
                        error.response.message =
                            this.classValidatorSimplifyMessage(message);
                    });
                }
                throw error;
            }
            catch (error) {
                throw error;
            }
        })));
    }
};
ErrorsInterceptor = __decorate([
    (0, common_1.Injectable)()
], ErrorsInterceptor);
exports.ErrorsInterceptor = ErrorsInterceptor;
//# sourceMappingURL=errors.interceptor.js.map