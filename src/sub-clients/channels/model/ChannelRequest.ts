import { Duration } from 'dayjs/plugin/duration';
import { DistributionMethod } from '../../common/model/DistributionMethod';
import { LegalRestrictionRequest } from '../../legalRestrictions/model/LegalRestriction';
import { IngestDetails } from './IngestDetails';
import { MarketingInformationRequest } from './MarketingInformationRequest';

export interface ChannelRequest {
  name?: string;
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
  deliveryFrequency?: Duration;
  ingest?: IngestDetails;
  contractId?: string;
}
