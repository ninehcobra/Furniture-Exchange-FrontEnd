import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { UPLOAD_CONSTANTS } from 'src/common/constants/upload.constant';

@Controller('cloudinary')
@ApiTags('cloudinary')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post('upload/single')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('image', {
      limits: { fileSize: UPLOAD_CONSTANTS.MAX_FILE_SIZE }, // 1MB
      fileFilter: (req, file, callback) => {
        const allowedMimeTypes = UPLOAD_CONSTANTS.VALID_UPLOADS_MIME_TYPES.map(
          (type) => type.toString(),
        );

        if (allowedMimeTypes.includes(file.mimetype)) {
          callback(null, true); // Accept the file
        } else {
          callback(
            new BadRequestException(
              'Invalid file type. Only image files are allowed.' +
                UPLOAD_CONSTANTS.VALID_UPLOADS_MIME_TYPES.join(', '),
            ),
            false,
          ); // Reject the file
        }
      },
    }),
  )
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    return await this.cloudinaryService.uploadFile(file).catch((err) => {
      throw new BadRequestException(err);
    });
  }

  @Post('upload/multiple')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        images: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('images', {
      limits: {
        files: UPLOAD_CONSTANTS.MAX_UPLOAD_MULTIPLE_FILES,
        fileSize: UPLOAD_CONSTANTS.MAX_FILE_SIZE,
      },
    }),
  )
  uploadImages(@UploadedFile() files: Express.Multer.File[]) {
    // return this.cloudinaryService.uploadFiles(files);
  }
}
