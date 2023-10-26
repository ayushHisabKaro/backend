/// <reference types="multer" />
/// <reference types="node" />
import { FileService } from './file.service';
import { UpdateFileDto } from './dto/update-file.dto';
import { DeleteFileDto } from './dto/create-file.dto';
type fileFilter = {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    destination: string;
    filename: string;
    path: string;
    buffer: Buffer;
};
export declare const MULTER_ERROR_MESSAGE = "Error: Images Only!";
export declare const PRODUCT_IMAGES_OPTIONS: {
    dest: string;
    limits: {
        fileSize: number;
    };
    fileFilter: (_req: any, file: any, cb: any) => any;
};
export declare class FileController {
    private readonly fileService;
    constructor(fileService: FileService);
    checkFile(file: fileFilter, cb: (error: Error, acceptFile: boolean) => void): void;
    create(file: Express.Multer.File): Promise<{
        Key: string;
        Location: string;
        Bucket: string;
    }>;
    createMany(request: any, files: Express.Multer.File[]): Promise<import("./file.service").UploadResponse[]>;
    findOne(id: string): string;
    findAll(): Promise<unknown>;
    update(id: string, updateFileDto: UpdateFileDto): string;
    remove(body: DeleteFileDto): void;
}
export {};
