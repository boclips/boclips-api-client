import { ContentCategories } from '../model/ContentCategories';
import { Channel } from '../model/Channel';
import { ChannelRequest } from '../model/ChannelRequest';

export interface ChannelsClient {
  get(id: string): Promise<Channel>;

  getAll(): Promise<Channel[]>;

  update(id: string, contentPartner: ChannelRequest): Promise<void>;

  create(request: ChannelRequest): Promise<void>;

  getContentCategories(): Promise<ContentCategories>;

  getSignedLink(filename: string): Promise<string>;
}
