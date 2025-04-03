import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello from Review.. get help at <a href="https://github.com/TobiOluwole/review">Our GitHub Documentation</a>';
  }
}
