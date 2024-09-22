import { Injectable } from '@nestjs/common';
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
          resource_type: 'auto',
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

  private async compressToWebP(fileBuffer: Buffer): Promise<Buffer> {
    const compressedImageBuffer = sharp(fileBuffer).webp({
      quality: 100,
    });

    return await compressedImageBuffer.toBuffer();
  }
}
