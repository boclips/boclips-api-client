import { ContractCostsResource } from './ContractCostsResource';
import { ContractDatesResource } from './ContractDatesResource';
import { ContractRestrictionsResource } from './ContractRestrictionsResource';
import { ContractRoyaltySplitResource } from './ContractRoyaltySplitResource';

export interface ContractResource {
  id: string;
  contentPartnerName: string;
  contractDocument?: string;
  contractDates?: ContractDatesResource;
  contractIsRolling?: boolean;
  daysBeforeTerminationWarning?: number;
  yearsForMaximumLicense?: number;
  daysForSellOffPeriod?: number;
  royaltySplit?: ContractRoyaltySplitResource;
  minimumPriceDescription?: string;
  remittanceCurrency?: string;
  restrictions?: ContractRestrictionsResource;
  costs?: ContractCostsResource;
  _links: any;
}
