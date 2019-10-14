import { AgeRange } from './AgeRange';
import { DistributionMethod } from './DistributionMethod';
import { LegalRestrictions } from './LegalRestrictions';

export default interface ContentPartner {
  id: string;
  name: string;
  official: boolean;
  ageRange: AgeRange | null;
  currency: string | null;
  legalRestrictions: LegalRestrictions | null;
  selfLink?: string;
  distributionMethods: DistributionMethod[];
}
