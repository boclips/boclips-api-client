import { AxiosInstance } from 'axios';
import { AdminLinks } from '../../adminLinks/model/AdminLinks';
import { LinkEntity } from '../model/LinkEntity';

export abstract class ApiSubClient {
  constructor(private adminLinks: AdminLinks, protected axios: AxiosInstance) {}

  protected getLinkOrThrow(adminLinkKey: keyof AdminLinks): LinkEntity {
    if (this.adminLinks && this.adminLinks[adminLinkKey]) {
      return this.adminLinks[adminLinkKey];
    } else {
      throw new Error(`Not authorized for ${adminLinkKey}`);
    }
  }

  protected getLink(adminLinkKey: keyof AdminLinks): LinkEntity | null {
    if (this.adminLinks && this.adminLinks[adminLinkKey]) {
      return this.adminLinks[adminLinkKey];
    } else {
      return null;
    }
  }
}
