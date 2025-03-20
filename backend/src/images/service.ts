import { join } from 'path';
import * as fs from 'fs';
import * as sharp from 'sharp';

import { Injectable, NotFoundException } from '@nestjs/common';

import { isImage, isValidURL } from '../helpers/functions'
import { IImageOptions } from 'src/helpers/interface';
import imageOperations from './operations';

@Injectable()
export class ImagesService {
  getHello(): string {
    return 'Hello World! from images';
  }

  async getImage(src: string, options: IImageOptions){

    let imagePath: string | ArrayBuffer;

    if(isValidURL(src)) { 
      imagePath = await isImage(src) // get image from url and check if isvalid image
    }else{ 
      imagePath = join(__dirname, '../..', 'images', src);
      if (!fs.existsSync(imagePath)) {
        throw new NotFoundException();
      }
    }


    let transformer = sharp(imagePath)
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

        const [operation, prescriptions] = operationString.split('_')

        try{
          if(operation && prescriptions){
            ({transformer, metadata} = await imageOperations[operation](transformer, prescriptions, metadata))
          }
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
