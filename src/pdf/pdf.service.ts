import { Injectable } from '@nestjs/common';
import * as fs from 'fs-extra';

@Injectable()
export class PdfService {
  async convertBufferToPdf(buffer: Buffer, filePath: string): Promise<void> {
    try {
      await fs.writeFile(filePath, buffer);
      console.log('PDF file has been successfully created:', filePath);
    } catch (error) {
      console.error('Error writing the PDF file:', error);
      throw new Error('PDF conversion failed');
    }
  }
}
