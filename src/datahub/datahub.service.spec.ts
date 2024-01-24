import { Test, TestingModule } from '@nestjs/testing';
import { DatahubService } from './datahub.service';

describe('DatahubService', () => {
  let service: DatahubService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatahubService],
    }).compile();

    service = module.get<DatahubService>(DatahubService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
