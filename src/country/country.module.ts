import { Module } from '@nestjs/common';
import { CountryService } from './country.service';
import { CountryResolver } from './country.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from './entities/country';
import { Xzqh } from './entities/xzqh';

@Module({
  imports: [TypeOrmModule.forFeature([Country,Xzqh])],
  providers: [CountryService, CountryResolver],
  exports: [CountryService],
})
export class CountryModule {}