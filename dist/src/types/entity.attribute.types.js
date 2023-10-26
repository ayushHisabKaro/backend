"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attendanceTypes = exports.notificationTypes = exports.LogTypes = exports.SalaryIntervals = exports.Roles = void 0;
var Roles;
(function (Roles) {
    Roles["BUSINESS"] = "BUSINESS";
    Roles["EMPLOYEE"] = "EMPLOYEE";
})(Roles = exports.Roles || (exports.Roles = {}));
var SalaryIntervals;
(function (SalaryIntervals) {
    SalaryIntervals["MONTH"] = "month";
    SalaryIntervals["WEEK"] = "week";
    SalaryIntervals["DAY"] = "day";
})(SalaryIntervals = exports.SalaryIntervals || (exports.SalaryIntervals = {}));
var LogTypes;
(function (LogTypes) {
    LogTypes["OTP"] = "OTP";
    LogTypes["ATTENDANCE"] = "ATTENDANCE";
    LogTypes["updateWeeklyOffTillNow"] = "updateWeeklyOffTillNow";
    LogTypes["OTHER"] = "OTHER";
})(LogTypes = exports.LogTypes || (exports.LogTypes = {}));
var notificationTypes;
(function (notificationTypes) {
    notificationTypes["Shortlisted"] = "Shortlisted";
    notificationTypes["Rejected"] = "Rejected";
    notificationTypes["Staff_Added"] = "Staff Added";
})(notificationTypes = exports.notificationTypes || (exports.notificationTypes = {}));
var attendanceTypes;
(function (attendanceTypes) {
    attendanceTypes["PRESENT"] = "PRESENT";
    attendanceTypes["ABSENT"] = "ABSENT";
    attendanceTypes["LATE_HALF_DAY"] = "LATE_HALF_DAY";
    attendanceTypes["WEEKLY_OFF"] = "WEEKLY_OFF";
    attendanceTypes["PAID_LEAVE"] = "PAID_LEAVE";
    attendanceTypes["PRESENT_PLUS_FULL_OVERTIME"] = "PRESENT_PLUS_FULL_OVERTIME";
    attendanceTypes["PRESENT_PLUS_HALF_OVERTIME"] = "PRESENT_PLUS_HALF_OVERTIME";
    attendanceTypes["CARRY_FORWARD"] = "CARRY_FORWARD";
})(attendanceTypes = exports.attendanceTypes || (exports.attendanceTypes = {}));
exports.default = {
    Roles,
};
//# sourceMappingURL=entity.attribute.types.js.map