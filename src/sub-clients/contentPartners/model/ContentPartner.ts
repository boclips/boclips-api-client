import { AgeRange } from '../../common/model/AgeRange';
import { DistributionMethod } from '../../common/model/DistributionMethod';
import { Link } from '../../common/model/LinkEntity';
import { LegalRestriction } from '../../legalRestrictions/model/LegalRestriction';

export interface ContentPartner {
  id: string;
  name: string;
  official: boolean;
  ageRange?: AgeRange;
  currency?: string;
  legalRestriction?: LegalRestriction;
  links: { self: Link };
  distributionMethods: DistributionMethod[];
}
