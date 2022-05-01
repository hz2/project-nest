import { Controller, Get, Header, Redirect } from '@nestjs/common';

@Controller()
export class AppController {

  @Get()
  @Redirect( process.env.APP_URL , 301)
  index(): string {
    return 'home page';
  }
}
