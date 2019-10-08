import BackofficeLinks from '../types/BackofficeLinks';

export class BackofficeLinksConverter {
  public static convert(response: any): BackofficeLinks {
    return response._links;
  }
}
