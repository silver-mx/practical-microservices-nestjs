import { Test, TestingModule } from '@nestjs/testing';
import { MessageStoreService } from './message-store.service';

describe('MessageStoreService', () => {
  let service: MessageStoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MessageStoreService],
    }).compile();

    service = module.get<MessageStoreService>(MessageStoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
