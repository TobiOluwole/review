import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImagesModule } from './images/module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    ImagesModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'images'), // Folder where images are stored
    }),
    CacheModule.register({
      ttl: 3600,
      max: 500,
      isGlobal: true,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
