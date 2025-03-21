import { join } from 'path';
import * as fs from 'fs';
import * as sharp from 'sharp';

import { Injectable, NotFoundException } from '@nestjs/common';

import { isImage, isMulterFile, isValidURL } from '../helpers/functions'
import { IImageOptions } from 'src/helpers/interface';
import imageOperations from './operations';

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
            ({transformer, metadata} = await imageOperations[operation](transformer, prescriptions, metadata))
          // }
        }catch(e){
            console.log('operations error',[operation, prescriptions],e)
        }
      }
    }


    // .extend({
    //   top: 10,
    //   bottom: 20,
    //   left: 10,
    //   right: 10,
    //   background: { r: 0, g: 0, b: 0, alpha: 0 }
    // });

    return transformer.toFormat(metadata.format!);
  }
}
