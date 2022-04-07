import { Module } from '@nestjs/common';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule , JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { Admin } from "./entities/admin.entity";
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
      // signOptions: { expiresIn: '3600s' },
    }),
    JwtService,
    TypeOrmModule.forFeature([Admin]),
  ],
  providers: [LocalStrategy, JwtStrategy],
})
export class AuthModule {}