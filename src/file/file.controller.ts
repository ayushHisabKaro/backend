import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Request,
  UseGuards,
  InternalServerErrorException,
} from '@nestjs/common';
import { FileService } from './file.service';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { unlink } from 'fs';
import { DeleteFileDto, MULTIPLE_FILES_API_BODY } from './dto/create-file.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

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
const filetypes = ['jpeg', 'jpg', 'png', 'gif', 'heic', 'heif', 'webp', 'pdf'];

export const MULTER_ERROR_MESSAGE = 'Error: Images Only!';
export const PRODUCT_IMAGES_OPTIONS = {
  dest: './dist/file/media',
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: function (_req, file, cb) {
    // Allowed ext
    const name = file.originalname;
    // Check ext
    console.log('name ', name);

    const extname = filetypes.filter((ft) =>
      name
        .toLocaleLowerCase()
        .substring(name.length - 4, name.length)
        .includes(ft),
    ).length;

    // Check mime
    const mimetype = [...filetypes, 'image'].filter((ft) =>
      file.mimetype.includes(ft),
    ).length;

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(
        {
          message: MULTER_ERROR_MESSAGE,
          name: '',
        },
        false,
      );
    }
  },
};

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('file')
@ApiTags('File')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  checkFile(file: fileFilter, cb: (error: Error, acceptFile: boolean) => void) {
    // Allowed ext
    const name = file.originalname;
    // Check ext
    const extname = filetypes.includes(
      name.substring(name.length - 4, name.length),
    );
    // Check mime
    const mimetype = [...filetypes, 'image'].includes(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(
        {
          message: 'Error: Images/Pdf Only!',
          name: '',
        },
        false,
      );
    }
  }

  @Post('single')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      dest: './dist/file/media',
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter: function (_req, file, cb) {
        console.log('file', file);

        // Allowed ext
        const name = file.originalname;
        console.log('name ', name);
        // Check ext
        const extname = filetypes.filter((ft) =>
          name
            .toLocaleLowerCase()
            .substring(name.length - 4, name.length)
            .includes(ft),
        ).length;

        // Check mime
        const mimetype = [...filetypes, 'image'].filter((ft) =>
          file.mimetype.includes(ft),
        ).length;

        if (mimetype && extname) {
          return cb(null, true);
        } else {
          cb(
            {
              message: 'Error: Images Only!',
              name: '',
            },
            false,
          );
        }
      },
    }),
  )
  async create(@UploadedFile() file: Express.Multer.File) {
    try {
      console.log(file ? file.path : 'NO FILE');
      if (!file) {
        throw new BadRequestException('File required');
      }
      const before = new Date().getTime();
      const result = (await this.fileService.uploadToS3(file)) as {
        Key: string;
        Location: string;
        Bucket: string;
      };
      // this.fileService.create({
      //   resourceId: result.Key,
      //   url: result.Location,
      // });
      const after = new Date().getTime();
      console.log(after - before);

      return result;
    } catch (error) {
      throw new InternalServerErrorException(error);
    } finally {
      unlink(file.path, (e) => {
        console.log('unlink ' + e);
      });
    }
  }

  @Post('multiple')
  // @Roles(rolesType.ADMIN, rolesType.EMPLOYEE)
  @ApiConsumes('multipart/form-data')
  @ApiBody(MULTIPLE_FILES_API_BODY)
  @UseInterceptors(FilesInterceptor('files', 10, PRODUCT_IMAGES_OPTIONS))
  async createMany(
    @Request() request,
    @UploadedFile() files: Express.Multer.File[],
  ) {
    console.log(request);

    console.log(files);

    if (!request.files.length) {
      throw new BadRequestException('File required');
    }
    const images = await this.fileService.uploadMany(request.files);
    return images;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fileService.findOne(+id);
  }
  @Get()
  findAll() {
    return this.fileService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
    return this.fileService.update(+id, updateFileDto);
  }

  @Delete()
  remove(@Body() body: DeleteFileDto) {
    return this.fileService.deleteFromS3(body.key);
  }
}
