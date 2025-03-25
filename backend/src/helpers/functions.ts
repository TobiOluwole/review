import { InternalServerErrorException, UnprocessableEntityException } from "@nestjs/common";
import axios from "axios";
import sharp from "sharp";

export function isValidURL(str: string): boolean {
    try {
        new URL(str); 
        return true;   
    } catch (e) {
        return false;  
    }
}

export async function downloadImage(url: string): Promise<ArrayBuffer> {
    const response = await axios.get(url, {
        responseType: 'arraybuffer',
    });
    return response.data; 
}

export async function isImage(url: string): Promise<ArrayBuffer> {
    try {
        const response = await axios.head(url);
        const contentType = response.headers['content-type'];
        if (contentType && contentType.startsWith('image/')) {
            return await downloadImage(url);
        } else {
            throw new UnprocessableEntityException();
        }
    } catch (error) {
        throw new InternalServerErrorException();
    }
}

export function isMulterFile(src: any): src is Express.Multer.File {
    return (
      src &&
      typeof src === 'object' &&
      typeof src.buffer === 'object' &&
      typeof src.originalname === 'string' &&
      typeof src.mimetype === 'string'
    );
  }