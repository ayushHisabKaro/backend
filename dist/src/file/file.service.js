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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileService = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_1 = require("cloudinary");
const fs_1 = require("fs");
const aws_config_1 = require("../config/aws.config");
const typeorm_1 = require("@nestjs/typeorm");
const file_entity_1 = require("./entities/file.entity");
const typeorm_2 = require("typeorm");
let FileService = class FileService {
    constructor(fileRepository) {
        this.fileRepository = fileRepository;
        this.uploadToS3 = async (file) => {
            return new Promise((resolve, reject) => {
                const params = {
                    Bucket: aws_config_1.Bucket,
                    Key: ('DOCUMENTS/' +
                        new Date().getTime().toString() +
                        file.filename.trim().replace(' ', '') +
                        '.' +
                        this.getExtension(file.originalname)).trim(),
                    Body: (0, fs_1.createReadStream)(file.path),
                };
                aws_config_1.s3.deleteObject();
                aws_config_1.s3.upload(params, function (err, data) {
                    if (err) {
                        console.log('Error', err);
                        reject(err);
                    }
                    if (data) {
                        console.log('Upload Success', data.Location);
                        resolve(data);
                    }
                    reject(err);
                });
            });
        };
    }
    getExtension(filename) {
        return (filename.substring(filename.lastIndexOf('.') + 1, filename.length) ||
            filename);
    }
    deleteFromS3(Key) {
        const s3BaseUrl = 'https://hisab-karo.s3.ap-south-1.amazonaws.com/';
        if (Key.includes(s3BaseUrl)) {
            Key = Key.substring(s3BaseUrl.length, Key.length);
        }
        var params = {
            Bucket: aws_config_1.Bucket,
            Key,
        };
        aws_config_1.s3.deleteObject(params, function (err, data) {
            if (err)
                console.log('deleteObject Error', err, err.stack);
            else
                console.log('deleteObject Success ', data);
        });
    }
    async upload(file) {
        const result = await cloudinary_1.v2.uploader.upload(file.path, {
            folder: 'Ecommerce',
        });
        (0, fs_1.unlink)(file.path, (e) => {
            console.log(e);
        });
        return { url: result.url, public_id: result.public_id };
    }
    async uploadMany(files) {
        var _a, e_1, _b, _c;
        const images = [];
        try {
            for (var _d = true, files_1 = __asyncValues(files), files_1_1; files_1_1 = await files_1.next(), _a = files_1_1.done, !_a;) {
                _c = files_1_1.value;
                _d = false;
                try {
                    const file = _c;
                    const image = await this.upload(file);
                    images.push(image);
                }
                finally {
                    _d = true;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = files_1.return)) await _b.call(files_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return images;
    }
    create(data) {
        return this.fileRepository.save(data);
    }
    async findAll() {
        var params = {
            Bucket: aws_config_1.Bucket,
            MaxKeys: 2,
        };
        return new Promise((resolve, reject) => {
            aws_config_1.s3.listObjectsV2(params, function (err, data) {
                if (err) {
                    console.log(err, err.stack);
                }
                else {
                    resolve(data);
                }
            });
        });
    }
    findOne(id) {
        return `This action returns a #${id} file`;
    }
    update(id, updateFileDto) {
        return `This action updates a #${id} file`;
    }
    async remove(id) {
        await cloudinary_1.v2.uploader.destroy(id);
        return { success: true };
    }
};
FileService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(file_entity_1.File)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FileService);
exports.FileService = FileService;
//# sourceMappingURL=file.service.js.map