import { AdminLinks } from '../types';

export class AdminLinksConverter {
  public static convert(response: any): AdminLinks {
    return response._links;
  }
}
