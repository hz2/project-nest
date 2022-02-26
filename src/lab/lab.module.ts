import { Module } from '@nestjs/common';
import { LabService } from './lab.service';
import { LabResolver } from './lab.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from './entities/country';
import { Xzqh } from './entities/xzqh';
import { Gua } from './entities/gua';

@Module({
  imports: [TypeOrmModule.forFeature([Country, Xzqh, Gua])],
  providers: [LabService, LabResolver],
  exports: [LabService],
})
export class LabModule { }