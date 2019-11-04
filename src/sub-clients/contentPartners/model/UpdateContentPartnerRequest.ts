import { AgeRangeRequest } from '../../collections/model/CollectionRequest';
import { DistributionMethod } from '../../common/model/DistributionMethod';
import { Link } from '../../common/model/LinkEntity';
import { LegalRestrictionsRequest } from '../../legalRestrictions/model/LegalRestrictions';

export interface UpdateContentPartnerRequest {
  name?: string;
  accreditedToYtChannelId?: string;
  legalRestrictions?: LegalRestrictionsRequest;
  ageRange?: AgeRangeRequest;
  distributionMethods?: DistributionMethod[];
  currency?: string;
}

export interface WithSelfLink<T> {
  self: Link;
  data: T;
}
