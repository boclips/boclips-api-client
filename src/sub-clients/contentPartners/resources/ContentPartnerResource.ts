import { AgeRange } from '../../common/model/AgeRange';
import { IngestDetailsResource } from './IngestDetailsResource';

export interface ContentPartnerResource {
  id: string;
  name: string;
  official: boolean;
  ageRange?: AgeRange;
  currency?: string;
  legalRestriction?: any;
  distributionMethods: any[];
  description?: string;
  awards?: string;
  notes?: string;
  hubspotId?: string;
  language?: any;
  contentCategories?: any[];
  contentTypes?: string[];
  oneLineDescription?: string;
  marketingInformation?: any;
  pedagogyInformation?: any;
  deliveryFrequency?: string;
  ingest?: IngestDetailsResource;
  _links: any;
}
