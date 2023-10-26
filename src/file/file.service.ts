import { Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { v2 } from 'cloudinary';
import { unlink, createReadStream } from 'fs';
import { s3, Bucket } from '../config/aws.config';
import { resolve } from 'path';
import { InjectRepository } from '@nestjs/typeorm';
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
@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private fileRepository: Repository<File>,
  ) {
    // v2.config({
    //   cloud_name: process.env.CLOUD_NAME,
    //   api_key: process.env.API_KEY,
    //   api_secret: process.env.API_SECRET,
    // });
  }

  getExtension(filename: string) {
    return (
      filename.substring(filename.lastIndexOf('.') + 1, filename.length) ||
      filename
    );
  }

  uploadToS3 = async (file: Express.Multer.File) => {
    return new Promise((resolve, reject) => {
      const params = {
        Bucket, // The name of the bucket. For example, 'sample_bucket_101'.
        Key: (
          'DOCUMENTS/' +
          new Date().getTime().toString() +
          file.filename.trim().replace(' ', '') +
          '.' +
          this.getExtension(file.originalname)
        ).trim(), // The name of the object. For example, 'sample_upload.txt'.
        Body: createReadStream(file.path), // The content of the object. For example, 'Hello world!".
      };
      s3.deleteObject();
      s3.upload(params, function (err, data) {
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

  deleteFromS3(Key: string) {
    const s3BaseUrl = 'https://hisab-karo.s3.ap-south-1.amazonaws.com/';
    if (Key.includes(s3BaseUrl)) {
      Key = Key.substring(s3BaseUrl.length, Key.length);
    }
    var params = {
      Bucket,
      Key,
    };
    s3.deleteObject(params, function (err, data) {
      if (err)
        console.log('deleteObject Error', err, err.stack); // an error occurred
      else console.log('deleteObject Success ', data); // successful response
      /*
       data = {
       }
       */
    });
  }

  async upload(file: Express.Multer.File): Promise<UploadResponse> {
    const result = await v2.uploader.upload(file.path, {
      folder: 'Ecommerce',
    });
    unlink(file.path, (e) => {
      console.log(e);
    });
    return { url: result.url, public_id: result.public_id };
  }

  async uploadMany(files: Express.Multer.File[]): Promise<UploadResponse[]> {
    const images = [];
    for await (const file of files) {
      const image = await this.upload(file);
      images.push(image);
    }
    return images;
  }

  create(data: DeepPartial<File>) {
    return this.fileRepository.save(data);
  }

  async findAll() {
    var params = {
      Bucket,
      MaxKeys: 2,
    };
    return new Promise((resolve, reject) => {
      s3.listObjectsV2(params, function (err, data) {
        if (err) {
          console.log(err, err.stack);
        } else {
          resolve(data);
        } // successful response
      });
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} file`;
  }

  update(id: number, updateFileDto: UpdateFileDto) {
    return `This action updates a #${id} file`;
  }

  async remove(id: string) {
    await v2.uploader.destroy(id);
    return { success: true };
  }
}
