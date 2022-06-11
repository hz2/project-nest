import { Controller, Get, Header, Redirect, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class AppController {
  @Get()
  getHello(
    @Res({ passthrough: true }) response: Response
  ) {
    response.redirect(process.env.APP_URL, 301)
  }
}
