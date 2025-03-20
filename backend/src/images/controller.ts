import { Controller, Get, Param, Query, Res, UseInterceptors } from '@nestjs/common';
import { Response } from 'express';
import { ImagesService } from './service';
import { CacheInterceptor, CacheKey } from '@nestjs/cache-manager';
import * as crypto from 'crypto';

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
  async getImage(
    @Res() res: Response,
    @Param('operation') operation: string,
    @Query('src') src: string
  ) {

    // !!!IMPORTANT -- WORKING ON CACHING
    
    const image = await this.imagesService.getImage(src, { operation });

    image.pipe(res)
  }

}
