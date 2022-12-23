import { Test, TestingModule } from '@nestjs/testing';
import { HomePageAggregator } from './home-page.aggregator';

describe('HomePageService', () => {
  let service: HomePageAggregator;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HomePageAggregator],
    }).compile();

    service = module.get<HomePageAggregator>(HomePageAggregator);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
