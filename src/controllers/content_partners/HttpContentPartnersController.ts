import { AxiosInstance } from 'axios';
import { ContentPartnersConverter } from '../../converters/ContentPartnersConverter';
import BackofficeLinks from '../../types/BackofficeLinks';
import ContentPartner from '../../types/ContentPartner';
import { ContentPartnersController } from './ContentPartnersController';
import expandUrlTemplate from '../../utils/expandUrlTemplate';

export class HttpContentPartnersController
  implements ContentPartnersController {
  public constructor(
    private backofficeLinks: BackofficeLinks,
    private axios: AxiosInstance,
  ) {}

  public async getAll(): Promise<ContentPartner[]> {
    if (this.backofficeLinks && this.backofficeLinks.contentPartners) {
      const response = await this.axios.get(
        this.backofficeLinks.contentPartners.href,
      );

      return ContentPartnersConverter.convertEmbeddedResources(response);
    } else {
      throw new Error('Not authorized for method');
    }
  }

  public async get(id: string) {
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
