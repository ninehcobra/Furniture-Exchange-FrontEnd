import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import { EnvVariables } from 'src/environments/env.interface';
import * as sharp from 'sharp';

import toStream = require('buffer-to-stream');

@Injectable()
export class CloudinaryService {
  constructor(private readonly configService: ConfigService<EnvVariables>) {}

  async uploadFile(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    const startTime = Date.now();

    const fileBuffer = await this.compressToWebP(file.buffer);

    return new Promise((resolve, reject) => {
      const uploadStream = v2.uploader.upload_stream(
        {
          resource_type: 'image',
          folder: `${this.configService.get<string>('CLOUDINARY_FOLDER')}`,
          public_id: `${new Date().toISOString()}-${file.originalname}`,
          phash: true,
        },
        (err: UploadApiErrorResponse, result: UploadApiResponse) => {
          if (err) {
            console.error('Cloudinary upload error:', err);

            return reject(err);
          }

          // End timing
          const endTime = Date.now();
          const uploadDuration = (endTime - startTime) / 1000; // Convert to seconds

          console.log(`Cloudinary upload duration: ${uploadDuration}s`);

          console.log('Cloudinary upload result:', result);
          resolve(result);
        },
      );

      toStream(fileBuffer).pipe(uploadStream);
    });
  }

  async uploadFileFromUrl(
    url: string,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    const isValidUrl = await this.isValidUrlImage(url);

    if (!isValidUrl) {
      throw new BadRequestException('Invalid image URL:' + url);
    }

    return new Promise((resolve, reject) => {
      const startTime = Date.now();

      v2.uploader.upload(
        url,
        {
          resource_type: 'auto',
          folder: `${this.configService.get<string>('CLOUDINARY_FOLDER')}`,
          phash: true,
          format: 'webp',
        },
        (err: UploadApiErrorResponse, result: UploadApiResponse) => {
          if (err) {
            console.error('Cloudinary upload error:', err);

            return reject(err);
          }

          // End timing
          const endTime = Date.now();
          const uploadDuration = (endTime - startTime) / 1000; // Convert to seconds

          console.log(`Cloudinary upload duration: ${uploadDuration}s`);

          console.log('Cloudinary upload result:', result);
          resolve(result);
        },
      );
    });
  }

  async deleteFile(
    publicId: string,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      v2.uploader.destroy(
        publicId,
        (err: UploadApiErrorResponse, result: UploadApiResponse) => {
          if (err) {
            console.error('Cloudinary delete error:', err);

            return reject(err);
          }

          console.log('Cloudinary delete result:', result);
          resolve(result);
        },
      );
    });
  }

  async deleteFiles(
    publicIds: string[],
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      v2.api.delete_resources(
        publicIds,
        {
          resource_type: 'image',
        },
        (err: UploadApiErrorResponse, result: UploadApiResponse) => {
          if (err) {
            console.error('Cloudinary delete error:', err);

            return reject(err);
          }

          console.log('Cloudinary delete result:', result);
          resolve(result);
        },
      );
    });
  }

  private async compressToJpg(fileBuffer: Buffer): Promise<Buffer> {
    const compressedImageBuffer = sharp(fileBuffer).jpeg({
      quality: 80,
      progressive: true,
    });

    return await compressedImageBuffer.toBuffer();
  }

  private async compressToWebP(fileBuffer: Buffer): Promise<Buffer> {
    const compressedImageBuffer = sharp(fileBuffer).webp({
      quality: 80,
    });

    return await compressedImageBuffer.toBuffer();
  }

  private async isValidUrlImage(url: string): Promise<boolean> {
    const response = await fetch(url, { method: 'HEAD' });

    if (!response.ok) {
      return false;
    }

    const contentType = response.headers.get('content-type');

    if (!contentType || !contentType.startsWith('image/')) {
      return false;
    }

    return true;
  }
}
