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
exports.PdfController = void 0;
const fs = require("fs-extra");
const common_1 = require("@nestjs/common");
const child_process_1 = require("child_process");
const pdf_service_1 = require("./pdf.service");
const platform_express_1 = require("@nestjs/platform-express");
let PdfController = class PdfController {
    constructor(pdfService) {
        this.pdfService = pdfService;
    }
    getDetail() {
        return "hello";
    }
    async pdfDataReader(pdf) {
        console.log(pdf);
        if (!pdf) {
            return 'No file uploaded';
        }
        const uploadPath = './src/pythonPdfScript/uploads/';
        const fileName = 'output.pdf';
        fs.ensureDirSync(uploadPath);
        const filePath = uploadPath + fileName;
        try {
            await this.pdfService.convertBufferToPdf(pdf.buffer, filePath);
            console.log('PDF file has been successfully created');
        }
        catch (error) {
            console.log('Failed to convert PDF');
        }
        const pythonScriptPath = './src/pythonPdfScript/ankush.py';
        (0, child_process_1.exec)(`python3 ${pythonScriptPath}`, (error, stdout) => {
            if (error) {
                console.log(error);
            }
            console.log(stdout);
        });
        return "You did it";
    }
};
__decorate([
    (0, common_1.Get)("getPdfDetails"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PdfController.prototype, "getDetail", null);
__decorate([
    (0, common_1.Post)('send-Pdf'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("File")),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PdfController.prototype, "pdfDataReader", null);
PdfController = __decorate([
    (0, common_1.Controller)('pdf'),
    __metadata("design:paramtypes", [pdf_service_1.PdfService])
], PdfController);
exports.PdfController = PdfController;
//# sourceMappingURL=pdf.controller.js.map