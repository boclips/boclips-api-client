import { ApiSubClient } from '../../common/client/ApiSubClient';
import expandUrlTemplate from '../../common/utils/expandUrlTemplate';
import { ContentPartnersConverter } from '../ContentPartnersConverter';
import { ContentPartner } from '../model/ContentPartner';
import {
  UpdateContentPartnerRequest,
  WithSelfLink,
} from '../model/UpdateContentPartnerRequest';
import { ContentPartnersClient } from './ContentPartnersClient';

export class ApiContentPartnersClient extends ApiSubClient
  implements ContentPartnersClient {
  public async getAll(): Promise<ContentPartner[]> {
    const contentPartnersLink = this.getLinkOrThrow('contentPartners');

    return this.axios
      .get(expandUrlTemplate(contentPartnersLink.href, {}))
      .then(ContentPartnersConverter.convertEmbeddedResources);
  }

  public async get(id: string): Promise<ContentPartner> {
    const contentPartnerLink = this.getLinkOrThrow('contentPartner');

    return this.axios
      .get(expandUrlTemplate(contentPartnerLink.href, { id }))
      .then(ContentPartnersConverter.convertResource);
  }

  public async update(
    _: string,
    contentPartner: WithSelfLink<UpdateContentPartnerRequest>,
  ): Promise<void> {
    await this.axios.put(
      contentPartner.self.getOriginalLink(),
      contentPartner.data,
      {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      },
    );
  }
}
