import { Test, TestingModule } from '@nestjs/testing';
import { CityInfoController } from './city-info.controller';
import { CityInfoService } from './city-info.service';

describe('CityInfoController', () => {
  let controller: CityInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CityInfoController],
      providers: [CityInfoService],
    }).compile();

    controller = module.get<CityInfoController>(CityInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
