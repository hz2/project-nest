import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublicService } from './public.service';
import { PublicController } from './public.controller';
import { PublicSubscriber } from './public.subscriber';
import { Public } from "./entities/public.entity"

@Module({
  imports: [TypeOrmModule.forFeature([Public])],
  providers: [PublicService,PublicSubscriber],
  controllers: [PublicController],
  exports: [TypeOrmModule],
})
export class PublicModule {}
