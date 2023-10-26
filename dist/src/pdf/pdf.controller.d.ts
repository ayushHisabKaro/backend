/// <reference types="multer" />
import { PdfService } from './pdf.service';
export declare class PdfController {
    private readonly pdfService;
    constructor(pdfService: PdfService);
    getDetail(): string;
    pdfDataReader(pdf: Express.Multer.File): Promise<"No file uploaded" | "You did it">;
}
