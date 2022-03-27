import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { Menu } from './entities/menu.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuSubscriber } from './public.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([Menu])],
  providers: [MenuService,MenuSubscriber],
  controllers: [MenuController],
  exports: [TypeOrmModule],
})
export class MenuModule {}
