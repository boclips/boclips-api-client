import moment from 'moment';
import { AgeRange } from '../../common/model/AgeRange';
import { DistributionMethod } from '../../common/model/DistributionMethod';
import { Link } from '../../common/model/LinkEntity';
import { LegalRestriction } from '../../legalRestrictions/model/LegalRestriction';
import { ContentCategory } from './ContentCategories';
import { IngestDetails } from './IngestDetails';
import { Language } from './Language';
import { MarketingInformation } from './MarketingInformation';
import { PedagogyInformation } from './PedagogyInformation';

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
  oneLineDescription?: string;
  marketingInformation?: MarketingInformation;
  pedagogyInformation?: PedagogyInformation;
  deliveryFrequency?: moment.Duration;
  ingest: IngestDetails;
  links: { self: Link };
}
