import { Test, TestingModule } from '@nestjs/testing';
import { RecordViewingsController } from './record-viewings.controller';

describe('RecordViewingsController', () => {
  let controller: RecordViewingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecordViewingsController],
    }).compile();

    controller = module.get<RecordViewingsController>(RecordViewingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
