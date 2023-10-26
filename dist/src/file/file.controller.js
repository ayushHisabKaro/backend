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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileController = exports.PRODUCT_IMAGES_OPTIONS = exports.MULTER_ERROR_MESSAGE = void 0;
const common_1 = require("@nestjs/common");
const file_service_1 = require("./file.service");
const update_file_dto_1 = require("./dto/update-file.dto");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const fs_1 = require("fs");
const create_file_dto_1 = require("./dto/create-file.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const filetypes = ['jpeg', 'jpg', 'png', 'gif', 'heic', 'heif', 'webp', 'pdf'];
exports.MULTER_ERROR_MESSAGE = 'Error: Images Only!';
exports.PRODUCT_IMAGES_OPTIONS = {
    dest: './dist/file/media',
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: function (_req, file, cb) {
        const name = file.originalname;
        console.log('name ', name);
        const extname = filetypes.filter((ft) => name
            .toLocaleLowerCase()
            .substring(name.length - 4, name.length)
            .includes(ft)).length;
        const mimetype = [...filetypes, 'image'].filter((ft) => file.mimetype.includes(ft)).length;
        if (mimetype && extname) {
            return cb(null, true);
        }
        else {
            cb({
                message: exports.MULTER_ERROR_MESSAGE,
                name: '',
            }, false);
        }
    },
};
let FileController = class FileController {
    constructor(fileService) {
        this.fileService = fileService;
    }
    checkFile(file, cb) {
        const name = file.originalname;
        const extname = filetypes.includes(name.substring(name.length - 4, name.length));
        const mimetype = [...filetypes, 'image'].includes(file.mimetype);
        if (mimetype && extname) {
            return cb(null, true);
        }
        else {
            cb({
                message: 'Error: Images/Pdf Only!',
                name: '',
            }, false);
        }
    }
    async create(file) {
        try {
            console.log(file ? file.path : 'NO FILE');
            if (!file) {
                throw new common_1.BadRequestException('File required');
            }
            const before = new Date().getTime();
            const result = (await this.fileService.uploadToS3(file));
            const after = new Date().getTime();
            console.log(after - before);
            return result;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
        finally {
            (0, fs_1.unlink)(file.path, (e) => {
                console.log('unlink ' + e);
            });
        }
    }
    async createMany(request, files) {
        console.log(request);
        console.log(files);
        if (!request.files.length) {
            throw new common_1.BadRequestException('File required');
        }
        const images = await this.fileService.uploadMany(request.files);
        return images;
    }
    findOne(id) {
        return this.fileService.findOne(+id);
    }
    findAll() {
        return this.fileService.findAll();
    }
    update(id, updateFileDto) {
        return this.fileService.update(+id, updateFileDto);
    }
    remove(body) {
        return this.fileService.deleteFromS3(body.key);
    }
};
__decorate([
    (0, common_1.Post)('single'),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        dest: './dist/file/media',
        limits: { fileSize: 5 * 1024 * 1024 },
        fileFilter: function (_req, file, cb) {
            console.log('file', file);
            const name = file.originalname;
            console.log('name ', name);
            const extname = filetypes.filter((ft) => name
                .toLocaleLowerCase()
                .substring(name.length - 4, name.length)
                .includes(ft)).length;
            const mimetype = [...filetypes, 'image'].filter((ft) => file.mimetype.includes(ft)).length;
            if (mimetype && extname) {
                return cb(null, true);
            }
            else {
                cb({
                    message: 'Error: Images Only!',
                    name: '',
                }, false);
            }
        },
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('multiple'),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)(create_file_dto_1.MULTIPLE_FILES_API_BODY),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 10, exports.PRODUCT_IMAGES_OPTIONS)),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "createMany", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FileController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FileController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_file_dto_1.UpdateFileDto]),
    __metadata("design:returntype", void 0)
], FileController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_file_dto_1.DeleteFileDto]),
    __metadata("design:returntype", void 0)
], FileController.prototype, "remove", null);
FileController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('file'),
    (0, swagger_1.ApiTags)('File'),
    __metadata("design:paramtypes", [file_service_1.FileService])
], FileController);
exports.FileController = FileController;
//# sourceMappingURL=file.controller.js.map