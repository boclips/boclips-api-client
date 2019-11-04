import { ContentPartner } from '../model/ContentPartner';
import {
  UpdateContentPartnerRequest,
  WithSelfLink,
} from '../model/UpdateContentPartnerRequest';

export interface ContentPartnersClient {
  get(id: string): Promise<ContentPartner>;
  getAll(): Promise<ContentPartner[]>;
  update(
    id: string,
    contentPartner: WithSelfLink<UpdateContentPartnerRequest>,
  ): Promise<void>;
}
