import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CityInfoModule } from './city-info/city-info.module';

@Module({
  imports: [CityInfoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
