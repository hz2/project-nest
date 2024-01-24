import { Test, TestingModule } from '@nestjs/testing';
import { DatahubController } from './datahub.controller';
import { DatahubService } from './datahub.service';

describe('DatahubController', () => {
  let controller: DatahubController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DatahubController],
      providers: [DatahubService],
    }).compile();

    controller = module.get<DatahubController>(DatahubController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
