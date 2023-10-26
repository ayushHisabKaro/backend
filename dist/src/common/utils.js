"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomCode = exports.getDateFromTimeString = void 0;
const moment = require("moment");
const getDateFromTimeString = (time) => {
    return new Date(`${moment().format('YYYY-MM-DD')} ${time}`);
};
exports.getDateFromTimeString = getDateFromTimeString;
const generateRandomCode = () => {
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
};
exports.generateRandomCode = generateRandomCode;
//# sourceMappingURL=utils.js.map