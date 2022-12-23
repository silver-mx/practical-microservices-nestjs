import { VersionConflictError } from './version-conflict-error';

describe('VersionConflictError', () => {
  it('should be defined', () => {
    expect(new VersionConflictError()).toBeDefined();
  });
});
