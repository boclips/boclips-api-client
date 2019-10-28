import { AdminLinks } from './model/AdminLinks';

export class AdminLinksConverter {
  public static convert(response: any): AdminLinks {
    return response._links;
  }
}
