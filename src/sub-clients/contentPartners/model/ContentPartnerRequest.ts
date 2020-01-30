import { AgeRangeRequest } from '../../collections/model/CollectionRequest';
import { DistributionMethod } from '../../common/model/DistributionMethod';
import { LegalRestrictionRequest } from '../../legalRestrictions/model/LegalRestriction';
import { ContentCategory } from './ContentCategories';
import { Language } from './Language';

export interface ContentPartnerRequest {
  name: string;
  accreditedToYtChannelId?: string;
  legalRestrictions?: LegalRestrictionRequest;
  ageRange?: AgeRangeRequest;
  distributionMethods?: DistributionMethod[];
  currency?: string;
  description?: string;
  awards?: string;
  notes?: string;
  hubspotId?: string;
  language?: Language;
  contentCategories?: ContentCategory[];
}
