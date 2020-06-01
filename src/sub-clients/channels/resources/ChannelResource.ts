import { IngestDetailsResource } from './IngestDetailsResource';

export interface ChannelResource {
  id: string;
  name: string;
  official: boolean;
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
  contractId?: string;
  contractName?: string;
  _links: any;
}
