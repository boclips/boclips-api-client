import { ContentPartnerContractCostsResource } from './ContentPartnerContractCostsResource';
import { ContentPartnerContractDatesResource } from './ContentPartnerContractDatesResource';
import { ContentPartnerContractRestrictionsResource } from './ContentPartnerContractRestrictionsResource';
import { ContentPartnerContractRoyaltySplitResource } from './ContentPartnerContractRoyaltySplitResource';

export interface ContentPartnerContractResource {
  id: string;
  contentPartnerName: string;
  contractDocument?: string;
  contractDates?: ContentPartnerContractDatesResource;
  contractIsRolling?: boolean;
  daysBeforeTerminationWarning?: number;
  yearsForMaximumLicense?: number;
  daysForSellOffPeriod?: number;
  royaltySplit?: ContentPartnerContractRoyaltySplitResource;
  minimumPriceDescription?: string;
  remittanceCurrency?: string;
  restrictions?: ContentPartnerContractRestrictionsResource;
  costs?: ContentPartnerContractCostsResource;
  _links: any;
}
