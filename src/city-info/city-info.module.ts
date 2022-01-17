import { Module } from '@nestjs/common';
import { CityInfoService } from './city-info.service';
import { CityInfoController } from './city-info.controller';

@Module({
  controllers: [CityInfoController],
  providers: [CityInfoService]
})
export class CityInfoModule {}
