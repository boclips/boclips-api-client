import { AgeRange } from '../../common/model/AgeRange';
import { DistributionMethod } from '../../common/model/DistributionMethod';
import { Link } from '../../common/model/LinkEntity';
import { LegalRestriction } from '../../legalRestrictions/model/LegalRestriction';
import { ContentCategory } from './ContentCategories';
import { Language } from './Language';
import { MarketingInformation } from './MarketingInformation';

export interface ContentPartner {
  id: string;
  name: string;
  official: boolean;
  ageRange?: AgeRange;
  currency?: string;
  legalRestriction?: LegalRestriction;
  distributionMethods: DistributionMethod[];
  description?: string;
  awards?: string;
  notes?: string;
  hubspotId?: string;
  language?: Language;
  contentCategories?: ContentCategory[];
  contentTypes?: string[];
  links: { self: Link };
  oneLineDescription?: string;
  marketingInformation?: MarketingInformation;
  curriculumAligned: string;
  educationalResources: string;
  isTranscriptProvided: boolean;
  subjects: string[];
  bestForTags: string[];
}
