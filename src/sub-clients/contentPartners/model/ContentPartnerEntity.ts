import { AgeRange } from '../../common/model/AgeRange';
import { DistributionMethod } from '../../common/model/DistributionMethod';
import { LinkEntity } from '../../common/model/LinkEntity';
import { LegalRestrictions } from '../../legalRestrictions/model/LegalRestrictions';

export interface ContentPartnerEntity {
  id: string;
  name: string;
  official: boolean;
  ageRange?: AgeRange;
  currency?: string;
  legalRestrictions?: LegalRestrictions;
  _links: { self: LinkEntity };
  distributionMethods: DistributionMethod[];
}
