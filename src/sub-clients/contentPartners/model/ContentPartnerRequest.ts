import moment from 'moment';
import { DistributionMethod } from '../../common/model/DistributionMethod';
import { LegalRestrictionRequest } from '../../legalRestrictions/model/LegalRestriction';
import { IngestDetails } from './IngestDetails';
import { MarketingInformationRequest } from './MarketingInformationRequest';

export interface ContentPartnerRequest {
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
  language?: string;
  contentCategories?: string[];
  contentTypes?: string[];
  oneLineDescription?: string;
  marketingInformation?: MarketingInformationRequest;
  curriculumAligned?: string;
  educationalResources?: string;
  isTranscriptProvided?: boolean;
  subjects?: string[];
  bestForTags?: string[];
  deliveryFrequency?: moment.Duration;
  ingest?: IngestDetails;
}
