import { AgeRangeRequest } from '../../collections/model/CollectionRequest';
import { DistributionMethod } from '../../common/model/DistributionMethod';
import { LegalRestrictionRequest } from '../../legalRestrictions/model/LegalRestriction';

export interface ContentPartnerRequest {
  name: string;
  accreditedToYtChannelId?: string;
  legalRestrictions?: LegalRestrictionRequest;
  ageRange?: AgeRangeRequest;
  distributionMethods?: DistributionMethod[];
  currency?: string;
  description?: string;
}
