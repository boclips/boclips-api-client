import { ApiSubClient } from '../../common/client/ApiSubClient';
import expandUrlTemplate from '../../common/utils/expandUrlTemplate';
import { ContentPartnersConverter } from '../ContentPartnersConverter';
import { ContentCategories } from '../model/ContentCategories';
import { ContentPartner } from '../model/ContentPartner';
import { ContentPartnerRequest } from '../model/ContentPartnerRequest';
import { UpdateContentPartnerRequest } from '../model/UpdateContentPartnerRequest';
import { ContentPartnersClient } from './ContentPartnersClient';

export class ApiContentPartnersClient extends ApiSubClient
  implements ContentPartnersClient {
  public async create(request: ContentPartnerRequest): Promise<void> {
    const contentPartnersLink = this.getLinkOrThrow('contentPartners');

    return this.axios.post(
      expandUrlTemplate(contentPartnersLink.href, {}),
      request,
    );
  }

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

  public async getContentCategories(): Promise<ContentCategories> {
    const contentCategories = this.getLinkOrThrow('contentCategories');

    return this.axios.get(contentCategories.href).then(res => ({
      categories: res.data._embedded.contentCategories,
    }));
  }

  public async update(
    id: string,
    contentPartner: UpdateContentPartnerRequest,
  ): Promise<void> {
    const contentPartnerLink = this.getLinkOrThrow('contentPartner');

    await this.axios.patch(
      expandUrlTemplate(contentPartnerLink.href, { id }),
      contentPartner,
      {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      },
    );
  }

  public async getSignedLink(filename: string): Promise<string> {
    const link = this.getLinkOrThrow('contentPartnersSignedUploadLink').href;
    return this.axios
      .post(link, {
        filename,
      })
      .then(it => {
        return it.headers.location;
      });
  }
}
