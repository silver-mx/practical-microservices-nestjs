export class VersionConflictError extends Error {
  public message: string;

  constructor(public stream: string, public expected: number, public actual: number) {

    super([
      'VersionConflict: stream',
      stream,
      'expected version',
      expected,
      'but was at version',
      actual
    ].join(' '));

    Object.setPrototypeOf(this, VersionConflictError.prototype);
  }
}
