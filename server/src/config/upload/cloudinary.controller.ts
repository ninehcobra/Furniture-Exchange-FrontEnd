import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Post,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { UPLOAD_CONSTANTS } from 'src/common/constants/upload.constant';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('cloudinary')
@ApiTags('cloudinary')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
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
    return await this.cloudinaryService.uploadFileFromUrl(url).catch((err) => {
      throw new BadRequestException(err);
    });
  }

  @Post('upload/urls')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        urls: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
      },
    },
  })
  uploadImagesFromUrls(@Body('urls') urls: string[]) {
    if (!urls || urls.length === 0) {
      throw new BadRequestException('At least one URL is required.');
    }

    const uploadedUrls = Promise.all(
      urls.map(async (url) => {
        const { secure_url } = await this.cloudinaryService
          .uploadFileFromUrl(url)
          .catch((err) => {
            throw new BadRequestException(err);
          });

        return secure_url;
      }),
    );

    return uploadedUrls;
  }

  @Delete('single')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        publicId: {
          type: 'string',
        },
      },
    },
  })
  async deleteImage(@Body('publicId') publicId: string) {
    return await this.cloudinaryService.deleteFile(publicId).catch((err) => {
      throw new BadRequestException(err);
    });
  }

  @Delete('multiple')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        publicIds: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
      },
    },
  })
  deleteImages(@Body('publicIds') publicIds: string[]) {
    if (!publicIds || publicIds.length === 0) {
      throw new BadRequestException('At least one public ID is required.');
    }

    const deletedImages = Promise.all(
      publicIds.map(async (publicId) => {
        const { result } = await this.cloudinaryService
          .deleteFile(publicId)
          .catch((err) => {
            throw new BadRequestException(err);
          });

        return result;
      }),
    );

    return deletedImages;
  }
}
