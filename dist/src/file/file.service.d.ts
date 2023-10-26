/// <reference types="express-serve-static-core" />
/// <reference types="passport" />
/// <reference types="multer" />
import { UpdateFileDto } from './dto/update-file.dto';
import { File } from './entities/file.entity';
import { DeepPartial, Repository } from 'typeorm';
export type UploadResponse = {
    url: string;
    public_id: string;
    cover?: boolean;
};
export type CommonUploadResponse = {
    url: string;
    public_id: string;
};
export declare class FileService {
    private fileRepository;
    constructor(fileRepository: Repository<File>);
    getExtension(filename: string): string;
    uploadToS3: (file: Express.Multer.File) => Promise<unknown>;
    deleteFromS3(Key: string): void;
    upload(file: Express.Multer.File): Promise<UploadResponse>;
    uploadMany(files: Express.Multer.File[]): Promise<UploadResponse[]>;
    create(data: DeepPartial<File>): Promise<DeepPartial<File> & File>;
    findAll(): Promise<unknown>;
    findOne(id: number): string;
    update(id: number, updateFileDto: UpdateFileDto): string;
    remove(id: string): Promise<{
        success: boolean;
    }>;
}
