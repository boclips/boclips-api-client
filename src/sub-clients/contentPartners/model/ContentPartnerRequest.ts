import { ContentPartnerAgeRangeRequest } from '../../collections/model/CollectionRequest';
import { DistributionMethod } from '../../common/model/DistributionMethod';
import { LegalRestrictionRequest } from '../../legalRestrictions/model/LegalRestriction';
import { ContentCategory } from './ContentCategories';
import { Language } from './Language';
import { MarketingInformationRequest } from './MarketingInformationRequest';

export interface ContentPartnerRequest {
  name: string;
  accreditedToYtChannelId?: string;
  legalRestrictions?: LegalRestrictionRequest;
  ageRange?: ContentPartnerAgeRangeRequest;
  distributionMethods?: DistributionMethod[];
  currency?: string;
  description?: string;
  awards?: string;
  notes?: string;
  hubspotId?: string;
  language?: Language;
  contentCategories?: ContentCategory[];
  contentTypes?: string[];
  oneLineDescription?: string;
  marketingInformation?: MarketingInformationRequest;
  curriculumAligned: string;
  educationalResources: string;
  isTranscriptProvided: boolean;
  subjects: string[];
  bestForTags: string[];
}
