import { Test, TestingModule } from '@nestjs/testing';
import { CityInfoService } from './city-info.service';

describe('CityInfoService', () => {
  let service: CityInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CityInfoService],
    }).compile();

    service = module.get<CityInfoService>(CityInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
