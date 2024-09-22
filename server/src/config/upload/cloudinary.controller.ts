import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
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
    FilesInterceptor('images', UPLOAD_CONSTANTS.MAX_UPLOAD_MULTIPLE_FILES, {
      limits: {
        fileSize: UPLOAD_CONSTANTS.MAX_FILE_SIZE,
      },
      fileFilter: (req, file, callback) => {
        const allowedMimeTypes = UPLOAD_CONSTANTS.VALID_UPLOADS_MIME_TYPES.map(
          (type) => type.toString(),
        );

        if (allowedMimeTypes.includes(file.mimetype)) {
          callback(null, true); // Accept the file
        } else {
          callback(
            new BadRequestException(
              'Invalid file type. Only image files are allowed: ' +
                UPLOAD_CONSTANTS.VALID_UPLOADS_MIME_TYPES.join(', '),
            ),
            false,
          ); // Reject the file
        }
      },
    }),
  )
  uploadImages(@UploadedFiles() files: Express.Multer.File[]) {
    if (!files || files.length === 0) {
      throw new BadRequestException('At least one file is required.');
    }

    const urls = Promise.all(
      files.map(async (file) => {
        const { secure_url } = await this.cloudinaryService
          .uploadFile(file)
          .catch((err) => {
            throw new BadRequestException(err);
          });

        return secure_url;
      }),
    );

    return urls;
  }

  @Post('upload/url')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        url: {
          type: 'string',
        },
      },
    },
  })
  async uploadImageFromUrl(@Body('url') url: string) {
    // console.log('url', url);
    return await this.cloudinaryService.uploadFileFromUrl(url).catch((err) => {
      throw new BadRequestException(err);
    });
  }
}
