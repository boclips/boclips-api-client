import { ContentCategories } from '../model/ContentCategories';
import { Channel } from '../model/Channel';
import { ContentPartnerRequest } from '../model/ContentPartnerRequest';

export interface ChannelsClient {
  get(id: string): Promise<Channel>;

  getAll(): Promise<Channel[]>;

  update(id: string, contentPartner: ContentPartnerRequest): Promise<void>;

  create(request: ContentPartnerRequest): Promise<void>;

  getContentCategories(): Promise<ContentCategories>;

  getSignedLink(filename: string): Promise<string>;
}
