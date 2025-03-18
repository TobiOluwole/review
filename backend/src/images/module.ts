import { Module } from '@nestjs/common';
import { ImagesController } from './controller';
import { ImagesService } from './service';

@Module({
  imports: [ ],
  controllers: [ImagesController],
  providers: [ImagesService],
})
export class ImagesModule {}
