import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
export declare class LoggerMiddleware implements NestMiddleware {
    Reset: string;
    Bright: string;
    Dim: string;
    Underscore: string;
    Blink: string;
    Reverse: string;
    Hidden: string;
    FgBlack: string;
    FgRed: string;
    FgGreen: string;
    FgYellow: string;
    FgBlue: string;
    FgMagenta: string;
    FgCyan: string;
    FgWhite: string;
    BgBlack: string;
    BgRed: string;
    BgGreen: string;
    BgYellow: string;
    BgBlue: string;
    BgMagenta: string;
    BgCyan: string;
    BgWhite: string;
    setColor(string: any, color: any): string;
    use(req: Request, res: Response, next: NextFunction): void;
}
