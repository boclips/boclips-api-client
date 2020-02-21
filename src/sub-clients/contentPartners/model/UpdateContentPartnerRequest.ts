import { DistributionMethod } from '../../common/model/DistributionMethod';
import { LegalRestrictionRequest } from '../../legalRestrictions/model/LegalRestriction';
import { ContentCategory } from './ContentCategories';
import { Language } from './Language';
import { MarketingInformationRequest } from './MarketingInformationRequest';
import { PedagogyInformationRequest } from './PedagogyInformationRequest';

export interface UpdateContentPartnerRequest {
  name?: string;
  accreditedToYtChannelId?: string;
  legalRestrictions?: LegalRestrictionRequest;
  ageRange?: string[];
  distributionMethods?: DistributionMethod[];
  currency?: string;
  description?: string;
  awards?: string;
  notes?: string;
  hubspotId?: string;
  language?: Language;
  contentCategories?: ContentCategory[];
  contentTypes?: string[];
  oneLineDescription?: string;
  marketingInformation?: MarketingInformationRequest;
  pedagogyInformation?: PedagogyInformationRequest;
}
