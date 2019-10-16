import { AxiosInstance } from 'axios';
import { ContentPartnersConverter } from '../../converters/ContentPartnersConverter';
import { ContentPartner } from '../../types';
import { BackofficeLinks } from '../../types';
import expandUrlTemplate from '../../utils/expandUrlTemplate';
import { ContentPartnersController } from './ContentPartnersController';

export class HttpContentPartnersController
  implements ContentPartnersController {
  public constructor(
    private backofficeLinks: BackofficeLinks,
    private axios: AxiosInstance,
  ) {}

  public async getAll(): Promise<ContentPartner[]> {
    if (this.backofficeLinks && this.backofficeLinks.contentPartners) {
      const response = await this.axios.get(
        expandUrlTemplate(this.backofficeLinks.contentPartners.href, {}),
      );

      return ContentPartnersConverter.convertEmbeddedResources(response);
    } else {
      throw new Error('Not authorized for method');
    }
  }

  public async get(id: string): Promise<ContentPartner> {
    if (this.backofficeLinks && this.backofficeLinks.contentPartner) {
      const contentPartnerUrl = expandUrlTemplate(
        this.backofficeLinks.contentPartner.href,
        { id },
      );

      const response = await this.axios.get(contentPartnerUrl);

      return ContentPartnersConverter.convertResource(response);
    } else {
      throw new Error('Not authorized for method');
    }
  }
}
