"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_entity_1 = require("../../user/entities/user.entity");
const typeorm_1 = require("typeorm");
const job_entity_1 = require("./job.entity");
let JobBookmarked = class JobBookmarked {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], JobBookmarked.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.jobsBookmarked, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", user_entity_1.User)
], JobBookmarked.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => job_entity_1.default, (job) => job.bookmarked, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", job_entity_1.default)
], JobBookmarked.prototype, "job", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], JobBookmarked.prototype, "createdAt", void 0);
JobBookmarked = __decorate([
    (0, typeorm_1.Entity)()
], JobBookmarked);
exports.default = JobBookmarked;
//# sourceMappingURL=jobBookmark.entity.js.map