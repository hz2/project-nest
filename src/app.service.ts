import { Get, Injectable, Redirect } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor() { }

  @Get()
  @Redirect('https://0xc8.com', 301)
  getHello(): string {
    return 'Hello World!';
  }

}
