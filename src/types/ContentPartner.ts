import { AgeRange } from './AgeRange';
import { DistributionMethod } from './DistributionMethod';
import { LegalRestrictions } from './LegalRestrictions';
import { Link } from './Link';

export interface ContentPartner {
  id: string;
  name: string;
  official: boolean;
  ageRange?: AgeRange;
  currency?: string;
  legalRestrictions?: LegalRestrictions;
  _links?: { self: Link };
  distributionMethods: DistributionMethod[];
}
