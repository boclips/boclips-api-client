import { BoclipsApiError, isBoclipsApiError } from './BoclipsApiError';

describe('IsBoclipsApiError', () => {
  it('is true when a valid error', () => {
    const error: BoclipsApiError = {
      error: 'hello',
      timestamp: new Date(),
      message: 'I am error',
      status: 411,
      path: '/v1/how-silly',
    };

    expect(isBoclipsApiError(error)).toBeTruthy();
  });

  it('is true when some fields are undefined', () => {
    const error = {
      error: 'hello',
      timestamp: new Date(),
      message: undefined,
      status: 411,
      path: '/v1/how-silly',
    };

    expect(isBoclipsApiError(error)).toBeTruthy();
  });

  it('is false for object with missing fields', () => {
    const error = {
      error: 'hello',
      timestamp: new Date(),
      status: 411,
    };

    expect(isBoclipsApiError(error)).toBeFalsy();
  });

  it('is false for random object', () => {
    const error = {
      response: { help: 'me' },
    };

    expect(isBoclipsApiError(error)).toBeFalsy();
  });
});
