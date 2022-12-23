import { AttachLocalsMiddleware } from './attach-locals.middleware';

describe('AttachLocalsMiddleware', () => {
  it('should be defined', () => {
    expect(new AttachLocalsMiddleware()).toBeDefined();
  });
});
