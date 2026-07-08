import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IStorageProvider } from '../interfaces/storage-provider.interface';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class CloudinaryProvider implements IStorageProvider {
  private readonly logger = new Logger(CloudinaryProvider.name);

  constructor(private readonly configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME') || 'fleximanage', // Fallback or read from env if provided
      api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get<string>('CLOUDINARY_API_SECRET'),
      secure: true,
    });
  }

  async uploadFile(key: string, buffer: Buffer, mimeType: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          public_id: key,
          resource_type: 'auto',
        },
        (error, result) => {
          if (error) return reject(error);
          if (!result) return reject(new Error('Upload failed'));
          resolve(result.secure_url);
        }
      );
      
      const stream = Readable.from(buffer);
      stream.pipe(uploadStream);
    });
  }

  async downloadFile(key: string): Promise<Buffer> {
     throw new Error('Not implemented. Cloudinary returns URLs for download.');
  }

  async deleteFile(key: string): Promise<boolean> {
    try {
      await cloudinary.uploader.destroy(key);
      return true;
    } catch (error) {
      this.logger.error(`Failed to delete file from Cloudinary: ${error.message}`);
      return false;
    }
  }

  async getSignedUrl(key: string, expiresIn?: number): Promise<string> {
    return cloudinary.url(key, { secure: true, sign_url: true, expires_at: expiresIn });
  }
}
