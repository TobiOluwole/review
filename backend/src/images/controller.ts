import { Body, Controller, Delete, Get, Param, Post, Query, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
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

  @Post('save')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Body('name') name: string,
  ) {
    return await this.imagesService.saveImage(file, name)
  }

  @Delete('delete')
  async deleteImage(
    @Query('name') name: string,
  ) {
    return await this.imagesService.deleteImage(name)
  }

  @Get(":operation")
  async getImage(
    @Res() res: Response,
    @Param('operation') operation: string,
    @Query('src') src: string
  ) {

    // !!!IMPORTANT -- WORKING ON CACHING
    
    const image = await this.imagesService.getImage(src, { operation });
    // res.setHeader('Content-Type', 'image/*');
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
