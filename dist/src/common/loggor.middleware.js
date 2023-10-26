"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerMiddleware = void 0;
const common_1 = require("@nestjs/common");
let LoggerMiddleware = class LoggerMiddleware {
    constructor() {
        this.Reset = '\x1b[0m';
        this.Bright = '\x1b[1m';
        this.Dim = '\x1b[2m';
        this.Underscore = '\x1b[4m';
        this.Blink = '\x1b[5m';
        this.Reverse = '\x1b[7m';
        this.Hidden = '\x1b[8m';
        this.FgBlack = '\x1b[30m';
        this.FgRed = '\x1b[31m';
        this.FgGreen = '\x1b[32m';
        this.FgYellow = '\x1b[33m';
        this.FgBlue = '\x1b[34m';
        this.FgMagenta = '\x1b[35m';
        this.FgCyan = '\x1b[36m';
        this.FgWhite = '\x1b[37m';
        this.BgBlack = '\x1b[40m';
        this.BgRed = '\x1b[41m';
        this.BgGreen = '\x1b[42m';
        this.BgYellow = '\x1b[43m';
        this.BgBlue = '\x1b[44m';
        this.BgMagenta = '\x1b[45m';
        this.BgCyan = '\x1b[46m';
        this.BgWhite = '\x1b[47m';
    }
    setColor(string, color) {
        return color + string + this.Reset;
    }
    use(req, res, next) {
        const startTime = new Date();
        let { ip, ips, method, path: url } = req;
        if (ip.includes('::ffff:127.0.0.1'))
            ip = req.header('x-forwarded-for');
        const { body, params, query } = req;
        const userAgent = req.get('user-agent') || '';
        let reqID = new Date().getTime().toString();
        method = this.setColor(method, this.FgGreen);
        reqID = this.setColor(reqID, this.Dim);
        ip = this.setColor(ip, this.Dim);
        url = this.setColor(this.setColor(url, this.FgBlack), this.BgGreen);
        console.log(`REQUEST: ${ip} ` + `${method} path: ${url}`);
        console.log(`BODY: `, body);
        console.log(`PARAM: `, params);
        console.log(`QUERY: `, query);
        res.on('close', (chunk) => {
            const { statusCode } = res;
            let scode = statusCode;
            if (statusCode >= 200 && statusCode <= 299) {
                scode = this.setColor(statusCode.toString(), this.FgGreen);
            }
            else if (statusCode >= 300 && statusCode <= 399) {
                scode = this.setColor(statusCode.toString(), this.FgYellow);
            }
            else if (statusCode >= 400 && statusCode <= 499) {
                scode = this.setColor(statusCode.toString(), this.FgYellow);
            }
            else if (statusCode >= 500 && statusCode <= 599) {
                scode = this.setColor(statusCode.toString(), this.FgRed);
            }
            const contentLength = res.get('content-length');
            const timeInSec = (new Date().getTime() - startTime.getTime()) / 1000;
            console.log(`\nRESPONSE: ${method} ${url} Status:${scode} ${contentLength} - ${userAgent} ${ip} ${timeInSec}sec \n Response Data :`);
        });
        next();
    }
};
LoggerMiddleware = __decorate([
    (0, common_1.Injectable)()
], LoggerMiddleware);
exports.LoggerMiddleware = LoggerMiddleware;
//# sourceMappingURL=loggor.middleware.js.map