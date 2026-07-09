import { Injectable, Logger } from "@nestjs/common";
import { IStorageProvider } from "../interfaces/storage-provider.interface";
import * as fs from "fs";
import * as path from "path";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class LocalStorageProvider implements IStorageProvider {
  private readonly storagePath = path.join(process.cwd(), "uploads");
  private readonly logger = new Logger(LocalStorageProvider.name);

  constructor() {
    if (!fs.existsSync(this.storagePath)) {
      fs.mkdirSync(this.storagePath, { recursive: true });
    }
  }

  async uploadFile(
    key: string,
    buffer: Buffer,
    mimeType: string
  ): Promise<string> {
    const filePath = path.join(this.storagePath, key);
    // Ensure directory exists for nested keys
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, buffer);
    return key;
  }

  async downloadFile(key: string): Promise<Buffer> {
    const filePath = path.join(this.storagePath, key);
    return fs.readFileSync(filePath);
  }

  async deleteFile(key: string): Promise<boolean> {
    const filePath = path.join(this.storagePath, key);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return true;
    }
    return false;
  }

  async getSignedUrl(key: string, expiresIn = 3600): Promise<string> {
    // Mock signed URL generation for local storage
    return `/local-storage/${key}?expires=${Date.now() + expiresIn * 1000}`;
  }
}
