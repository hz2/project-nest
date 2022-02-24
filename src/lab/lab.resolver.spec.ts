import { Test, TestingModule } from '@nestjs/testing';
import { LabResolver } from './lab.resolver';

describe('LabResolver', () => {
  let resolver: LabResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LabResolver],
    }).compile();

    resolver = module.get<LabResolver>(LabResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
