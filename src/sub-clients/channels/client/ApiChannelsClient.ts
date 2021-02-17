import { ApiSubClient } from '../../common/client/ApiSubClient';
import expandUrlTemplate from '../../common/utils/expandUrlTemplate';
import { ChannelsConverter } from '../ChannelsConverter';
import { ContentCategories } from '../model/ContentCategories';
import { Channel } from '../model/Channel';
import { ChannelRequest } from '../model/ChannelRequest';
import { ChannelsClient } from './ChannelsClient';
import { Projection } from '../../common/model/Projection';

export class ApiChannelsClient extends ApiSubClient implements ChannelsClient {
  public async create(request: ChannelRequest): Promise<void> {
    const contentPartnersLink = this.getLinkOrThrow('channels');

    return this.axios.post(
      expandUrlTemplate(contentPartnersLink.href, {}),
      request,
    );
  }

  public async getAll(projection?: Projection): Promise<Channel[]> {
    const contentPartnersLink = this.getLinkOrThrow('channels');

    return this.axios
      .get(
        expandUrlTemplate(contentPartnersLink.href, {
          projection: projection,
        }),
      )
      .then(ChannelsConverter.convertEmbeddedResources);
  }

  public async get(id: string): Promise<Channel> {
    const contentPartnerLink = this.getLinkOrThrow('channel');

    return this.axios
      .get(expandUrlTemplate(contentPartnerLink.href, { id }))
      .then(ChannelsConverter.convertResponse);
  }

  public async getContentCategories(): Promise<ContentCategories> {
    const contentCategories = this.getLinkOrThrow('contentCategories');

    return this.axios.get(contentCategories.href).then((res) => ({
      categories: res.data._embedded.contentCategories,
    }));
  }

  public async update(
    id: string,
    contentPartner: ChannelRequest,
  ): Promise<void> {
    const contentPartnerLink = this.getLinkOrThrow('channel');

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
    const link = this.getLinkOrThrow('channelsSignedUploadLink').href;
    return this.axios
      .post(link, {
        filename,
      })
      .then((it) => {
        return it.headers.location;
      });
  }
}
