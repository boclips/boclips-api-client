import { AxiosInstance } from 'axios';
import { AdminLinks } from '../types';

export abstract class HttpController {
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
