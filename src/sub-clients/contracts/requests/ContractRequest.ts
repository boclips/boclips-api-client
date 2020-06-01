import { ContractDatesResource } from '../resources/ContractDatesResource';
import { ContractRestrictionsResource } from '../resources/ContractRestrictionsResource';
import { ContractCostsResource } from '../resources/ContractCostsResource';
import { ContractRoyaltySplitResource } from '../resources/ContractRoyaltySplitResource';

export interface ContractRequest {
  contentPartnerName: string;
  contractDocument?: string | null;
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
}
