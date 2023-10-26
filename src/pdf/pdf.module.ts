import { Module } from "@nestjs/common";
import { PdfController } from "./pdf.controller";
import { PdfService } from "./pdf.service";
// import { MongooseModule } from "@nestjs/mongoose";
// import { pdfSchema } from "./pdfSchemas/pdf.schema";
@Module({
    // imports:[MongooseModule.forFeature([{name:pdfSchema.name,schema:pdfSchema}])],
    controllers:[PdfController],
    providers:[PdfService]
})
export class PdfModule{}