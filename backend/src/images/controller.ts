import { Body, Controller, Get, Param, Post, Query, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Response } from 'express';
import { ImagesService } from './service';
import { FileInterceptor } from '@nestjs/platform-express';

import { ApiOperation, ApiParam, ApiQuery, ApiBody, ApiResponse, ApiProduces } from '@nestjs/swagger';


@Controller('images')
// @UseInterceptors(CacheInterceptor) 
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Get()
  async getBlank(
    @Res() res: Response,
    @Query('src') src: string
  ) {
    const image = await this.imagesService.getImage(src, {});

    image.pipe(res)
  }

  @Get(":operation")
  @ApiOperation({ summary: 'Process an image', description: 'Applies an operation to an image and returns the transformed result.' })
  @ApiParam({ name: 'operation', required: true, example: 'resize(300x300);circle(100)', description: 'The image operation to apply (e.g., resize 300px by 300px, crop out circle).' })
  @ApiQuery({ name: 'src', required: true, example: 'image1.png', description: 'The image path relative to images/' })
  @ApiResponse({ status: 200, description: 'Processed successfully.' })
  @ApiProduces('image/png')
  async getImage(
    @Res() res: Response,
    @Param('operation') operation: string,
    @Query('src') src: string
  ) {

    // !!!IMPORTANT -- WORKING ON CACHING
    
    const image = await this.imagesService.getImage(src, { operation });
    res.setHeader('Content-Type', 'image/*');
    image.pipe(res)
  }

  @Post(":operation")
  @UseInterceptors(FileInterceptor('src'))
  // @UseInterceptors(FileInterceptor('src', { storage: diskStorage({ destination: './uploads' }) }))
  async getImageFromPost(
    @Res() res: Response,
    @Param('operation') operation: string,
    @UploadedFile() src: Express.Multer.File
  ) {

    // !!!IMPORTANT -- WORKING ON CACHING
    
    const image = await this.imagesService.getImage(src, { operation });

    image.pipe(res)
  }

}
