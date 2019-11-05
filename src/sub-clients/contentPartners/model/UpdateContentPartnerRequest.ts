import { AgeRangeRequest } from '../../collections/model/CollectionRequest';
import { DistributionMethod } from '../../common/model/DistributionMethod';
import { LegalRestrictionsRequest } from '../../legalRestrictions/model/LegalRestrictions';

export interface UpdateContentPartnerRequest {
  name?: string;
  accreditedToYtChannelId?: string;
  legalRestrictions?: LegalRestrictionsRequest;
  ageRange?: AgeRangeRequest;
  distributionMethods?: DistributionMethod[];
  currency?: string;
}
