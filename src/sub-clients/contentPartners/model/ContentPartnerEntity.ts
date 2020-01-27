import { AgeRange } from '../../common/model/AgeRange';
import { DistributionMethod } from '../../common/model/DistributionMethod';
import { LinkEntity } from '../../common/model/LinkEntity';
import { LegalRestriction } from '../../legalRestrictions/model/LegalRestriction';

export interface ContentPartnerEntity {
  id: string;
  name: string;
  official: boolean;
  ageRange?: AgeRange;
  currency?: string;
  legalRestriction?: LegalRestriction;
  _links: { self: LinkEntity };
  distributionMethods: DistributionMethod[];
}
