import { Get, Injectable, Redirect } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor() { }

  @Get()
  @Redirect( process.env.APP_URL , 301)
  getHello(): string {
    return 'Hello World!';
  }

}
