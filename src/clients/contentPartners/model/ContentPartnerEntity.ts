import { AgeRange } from '../../common/model/AgeRange';
import { DistributionMethod } from '../../common/model/DistributionMethod';
import { LinkEntity } from '../../common/model/LinkEntity';
import { LegalRestrictionsEntity } from '../../legalRestrictions/model/LegalRestrictionsEntity';

export interface ContentPartnerEntity {
  id: string;
  name: string;
  official: boolean;
  ageRange?: AgeRange;
  currency?: string;
  legalRestrictions?: LegalRestrictionsEntity;
  _links: { self: LinkEntity };
  distributionMethods: DistributionMethod[];
}
