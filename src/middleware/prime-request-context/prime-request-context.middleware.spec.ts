import { PrimeRequestContextMiddleware } from './prime-request-context.middleware';

describe('PrimeRequestContextMiddleware', () => {
  it('should be defined', () => {
    expect(new PrimeRequestContextMiddleware()).toBeDefined();
  });
});
