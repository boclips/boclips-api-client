import { ContentPartnerContract } from '../model/ContentPartnerContract';

export interface ContentPartnerContractsClient {
  get(id: string): Promise<ContentPartnerContract>;

  create(request: ContentPartnerContract): Promise<void>;
}
