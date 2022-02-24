import { Module } from '@nestjs/common';
import { LabService } from './country.service';
import { CountryResolver } from './country.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from './entities/country';
import { Xzqh } from './entities/xzqh';
import { Gua } from './entities/gua';

@Module({
  imports: [TypeOrmModule.forFeature([Country, Xzqh, Gua])],
  providers: [LabService, CountryResolver],
  exports: [LabService],
})
export class CountryModule { }