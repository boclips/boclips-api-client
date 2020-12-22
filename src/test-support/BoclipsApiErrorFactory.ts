import { BoclipsApiError } from '../types';

export class BoclipsApiErrorFactory {
  public static sample(
    apiError: Partial<BoclipsApiError> = {},
  ): BoclipsApiError {
    const defaults: BoclipsApiError = {
      error: 'Bad Request',
      message: 'your request failed because of reasons',
      path: '/v1/orders',
      status: 400,
      timestamp: new Date(),
    };
    return { ...defaults, ...apiError };
  }
}
