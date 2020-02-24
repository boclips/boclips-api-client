import { DistributionMethod } from '../../common/model/DistributionMethod';
import { LegalRestrictionRequest } from '../../legalRestrictions/model/LegalRestriction';
import { ContentCategory } from './ContentCategories';
import { Language } from './Language';
import { MarketingInformationRequest } from './MarketingInformationRequest';

export interface UpdateContentPartnerRequest {
  name?: string;
  accreditedToYtChannelId?: string;
  legalRestrictions?: LegalRestrictionRequest;
  ageRanges?: string[];
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
  curriculumAligned?: string;
  educationalResources?: string;
  isTranscriptProvided?: boolean;
  subjects?: string[];
  bestForTags?: string[];
}
