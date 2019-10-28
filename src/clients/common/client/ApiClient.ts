import { AxiosInstance } from 'axios';
import { AdminLinks } from '../../adminLinks/model/AdminLinks';

export abstract class ApiClient {
  protected adminLinks: AdminLinks;
  protected axios: AxiosInstance;

  public initialize(adminLinks: AdminLinks, axios: AxiosInstance) {
    this.adminLinks = adminLinks;
    this.axios = axios;
  }

  protected requestWithAdminLink(adminLinkKey: string, fn: () => Promise<any>) {
    if (this.adminLinks && this.adminLinks[adminLinkKey]) {
      return fn();
    } else {
      throw new Error('Not authorized for method');
    }
  }
}
