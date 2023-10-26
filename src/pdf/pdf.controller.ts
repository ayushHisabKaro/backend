import * as fs from 'fs-extra';
import {
  Controller,
  Get,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { exec } from "child_process"
import { Express } from 'express';
import { PdfService } from './pdf.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('pdf')
export class PdfController {

  constructor(private readonly pdfService: PdfService) { }
  @Get("getPdfDetails")
  getDetail() {
    return "hello"
  }
  @Post('send-Pdf')
  @UseInterceptors(FileInterceptor("File"))
  async pdfDataReader(@UploadedFile() pdf: Express.Multer.File ) {


    console.log(pdf)

    // 
    if (!pdf) {
      return 'No file uploaded';
    }
    const uploadPath = './src/pythonPdfScript/uploads/'; // Specify the desired directory path
    const fileName = 'output.pdf'; // Specify the desired file name


    // Create the "uploads" directory if it doesn't exist
    // const uploadPath = "/pdf/uploads";
    fs.ensureDirSync(uploadPath);
    const filePath = uploadPath + fileName;

    try {
      await this.pdfService.convertBufferToPdf(pdf.buffer, filePath);
      console.log('PDF file has been successfully created');
    } catch (error) {
      console.log('Failed to convert PDF');
    }
    // 

    const pythonScriptPath = './src/pythonPdfScript/ankush.py';

    exec(`python3 ${pythonScriptPath}`, (error, stdout) => {
      if (error) {
        console.log(error);

      }
      
      // const data=JSON.parse(stdout);
      console.log(stdout);
    });



    return "You did it";
  }

}