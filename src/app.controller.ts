import { Controller, Get, Redirect } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(
    private readonly appService: AppService

  ) { }

  @Get()
  @Redirect('https://0xc8.com', 301)
  getHello(): string {
    return this.appService.getHello();
  }
}
