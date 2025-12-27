import { Body, Controller, Post, UseInterceptors, UploadedFile } from "@nestjs/common";
import { ApiOperation, ApiTags, ApiBody, ApiConsumes } from "@nestjs/swagger";
import { LicensePlateService } from "../services/license_plate.service";
import { RecognizeLicensePlateDto } from "../license_plate.interface";
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, memoryStorage } from 'multer';
import { extname } from 'path';

@ApiTags("License Plate APIs")
@Controller("license-plate")
export class LicensePlateController {
    constructor(private readonly licensePlateService: LicensePlateService) {
    }

    // @ApiOperation({ summary: 'Recognize License Plate from Image URL' })
    // @Post('from-url')
    // async recognizeLicensePlate(
    //     @Body() dto: RecognizeLicensePlateDto
    // ) {
    //     const result = await this.licensePlateService.recognizeLicensePlate(dto.imageUrl);
    //     return result;
    // }

    @ApiOperation({ summary: 'Recognize License Plate from Image File' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: { type: 'string', format: 'binary' },
            },
            required: ['file'],
        },
    })
    @Post('upload')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: memoryStorage(), // ✅ dùng memoryStorage để có file.buffer
        }),
    )
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        if (!file) return { error: 'No file uploaded' };

        // Gửi buffer trực tiếp lên Plate Recognizer
        return await this.licensePlateService.recognizeLicensePlateFromBuffer(
            file.buffer,
            file.originalname,
        );
    }

    // @ApiOperation({ summary: 'Recognize License Plate from Image File' })
    // @ApiConsumes('multipart/form-data')
    // @ApiBody({
    //     schema: {
    //         type: 'object',
    //         properties: {
    //             file: {
    //                 type: 'string',
    //                 format: 'binary',
    //             },
    //         },
    //     },
    // })
    // @Post('upload')
    // @UseInterceptors(
    //     FileInterceptor('file', {
    //         storage: diskStorage({
    //             destination: '/tmp', // cloud-friendly
    //             filename: (req, file, cb) => {
    //                 const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    //                 cb(null, uniqueSuffix + extname(file.originalname));
    //             },
    //         }),
    //     }),
    // )
    // // async uploadFile(@UploadedFile() file: Express.Multer.File) {
    // //     if (!file) {
    // //         return { error: 'No file uploaded' };
    // //     }
    // //     const result = await this.licensePlateService.recognizeLicensePlateFromFile(file.path);
    // //     return result;
    // // }
    // async uploadFile(@UploadedFile() file: Express.Multer.File) {
    //     if (!file) return { error: 'No file uploaded' };

    //     return await this.licensePlateService.recognizeLicensePlateFromBuffer(file.buffer, file.originalname);
    // }
}