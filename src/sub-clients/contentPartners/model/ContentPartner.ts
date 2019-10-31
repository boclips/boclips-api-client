import { AgeRange } from '../../common/model/AgeRange';
import { DistributionMethod } from '../../common/model/DistributionMethod';
import { Link } from '../../common/model/LinkEntity';
import { LegalRestrictions } from '../../legalRestrictions/model/LegalRestrictions';

export interface ContentPartner {
  id: string;
  name: string;
  official: boolean;
  ageRange?: AgeRange;
  currency?: string;
  legalRestrictions?: LegalRestrictions;
  links: { self: Link };
  distributionMethods: DistributionMethod[];
}
