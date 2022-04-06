import { BadRequestException, Body, Controller, Get, Post, Request, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { Response, Request as RequestExpress } from 'express';


@Controller('api')
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService

  ) { }

  // @UseGuards(AuthGuard('local'))
  // @Post('auth/login')
  // async login(@Request() req) {
  //   return this.authService.login(req.user);
  // }


  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  // @Post('register')
  // async register(
  //   @Body('name') name: string,
  //   @Body('email') email: string,
  //   @Body('password') password: string
  // ) {
  //   const hashedPassword = await bcrypt.hash(password, 12);

  //   const user = await this.appService.create({
  //     name,
  //     email,
  //     password: hashedPassword
  //   });

  //   delete user.password;

  //   return user;
  // }

  @Post('login')
  async sysLogin(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) response: Response
  ) {
    const user = await this.authService.findOne({ email });

    if (!user) {
      throw new BadRequestException('invalid credentials');
    }

    if (!await bcrypt.compare(password, user.password)) {
      throw new BadRequestException('invalid credentials');
    }
    const jwt = await this.jwtService.signAsync({ email: user.email, id: user.id });
    response.cookie('jwt_0xc8_app', jwt, { httpOnly: true });
    return {
      access_token: jwt,
      message: 'success'
    };
  }

  @Get('user')
  async user(@Req() request: RequestExpress) {
    try {
      const cookie = request.cookies['jwt'];

      const data = await this.jwtService.verifyAsync(cookie);

      if (!data) {
        throw new UnauthorizedException();
      }

      const user = await this.authService.findOne({ id: data['id'] });

      const { password, ...result } = user;

      return result;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');

    return {
      message: 'success'
    }
  }

}
