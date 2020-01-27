import { AgeRangeRequest } from '../../collections/model/CollectionRequest';
import { DistributionMethod } from '../../common/model/DistributionMethod';
import { LegalRestrictionRequest } from '../../legalRestrictions/model/LegalRestriction';

export interface UpdateContentPartnerRequest {
  name?: string;
  accreditedToYtChannelId?: string;
  legalRestrictions?: LegalRestrictionRequest;
  ageRange?: AgeRangeRequest;
  distributionMethods?: DistributionMethod[];
  currency?: string;
}
