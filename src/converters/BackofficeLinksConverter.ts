import { BackofficeLinks } from '../types';

export class BackofficeLinksConverter {
  public static convert(response: any): BackofficeLinks {
    return response._links;
  }
}
