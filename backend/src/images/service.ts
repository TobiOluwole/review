import { join, extname, relative } from 'path';
import * as fs from 'fs';
import * as sharp from 'sharp';

import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';

import { isImage, isMulterFile, isValidURL } from '../helpers/functions'
import { IImageOptions } from 'src/helpers/interface';
import imageOperations from './operations';

import { randomBytes } from 'crypto';

@Injectable()
export class ImagesService {
  getHello(): string {
    return 'Hello World! from images';
  }

  private async image(src: string | Express.Multer.File){
    if(isMulterFile(src)){
      return src.buffer
    }else if(isValidURL(src as string)) { 
      return await isImage(src as string) // get image from url and check if isvalid image
    }else if (fs.existsSync(join(__dirname, '../..', 'images', src as string))) {
      return join(__dirname, '../..', 'images', src as string)
    } else{
      throw new NotFoundException();
    }
  }

  async getImage(src: string | Express.Multer.File, options: IImageOptions){
    
    const image = await this.image(src)

    let transformer = sharp(image)
    let metadata = await transformer.metadata()

    /**
     * {
        format: 'png',
        width: 1920,
        height: 1080,
        space: 'srgb',
        channels: 3,
        depth: 'uchar',
        density: 72,
        isProgressive: false,
        hasProfile: false,
        hasAlpha: false
      }
     */


    if(options.operation){
      const operations = options.operation.split(';')

      for (const operationString of operations) {

        // const [operation, prescriptions] = operationString.split('_')
        let [operation, prescriptions] = operationString.split('(')
        prescriptions = prescriptions?.replaceAll(')','')

        try{
          // if(operation && prescriptions){
          console.time('');
          ({transformer, metadata} = await imageOperations[operation](transformer, prescriptions, metadata))
          console.log('Ran',operation,'on height:',metadata.height,' and width:',metadata.width, 'for')
          console.timeEnd('')
          // }
        }catch(e){
            console.log('operations error',[operation, prescriptions],e)
        }
      }
    }
    
    return transformer
    .withExifMerge({
      "IFD0": {SideNote: "This image was eddited by Re-View; an open source project by Tobi Oluwole"}
    })
    .toFormat(metadata.format!);
  }

  
  async saveImage(file, name = Date.now() + randomBytes(8).toString('hex')) {
    // Extract the file extension from the original filename
    const fileExtension = extname(file.originalname);
    
    // Append the original file extension to the new name
    const fullName = name + fileExtension;
  
    const path = fullName.split('/').slice(0, -1).join('/');
    const uploadPath = join(__dirname, '../..', 'images');
    const uploadDir = join(__dirname, '../..', 'images', path);
    // const uploadPath = path ? join(__dirname, '../..', 'images', path) : join(__dirname, '../..', 'images');

  
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
  
    const filePath = join(uploadPath, fullName);
  
    fs.writeFileSync(filePath, file.buffer);
  
    return relative(uploadPath, filePath);
  }

  async deleteImage(name: string){
    const imagesDir = join(__dirname, '../..', 'images');
    
    // Construct the full path to the file
    const filePath = join(imagesDir, name);

    // Check if the file exists before attempting to delete
    if (fs.existsSync(filePath)) {
      fs.unlink(filePath, (err) => {
        if (err) {
          throw new InternalServerErrorException()
        } else {
          return true
        }
      });
    } else {
      throw new NotFoundException()
    }
  }
}
