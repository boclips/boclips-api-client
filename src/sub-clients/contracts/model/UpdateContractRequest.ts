import { ContractDates, ContractRoyaltySplit } from '../../../types';
import { ContractRestrictionsResource } from '../resources/ContractRestrictionsResource';
import { ContractCostsResource } from '../resources/ContractCostsResource';

export interface UpdateContractRequest {
  contentPartnerName?: string;
  contractDocument?: string | null;
  contractDates?: ContractDates;
  contractIsRolling?: boolean;
  daysBeforeTerminationWarning?: number;
  yearsForMaximumLicense?: number;
  daysForSellOffPeriod?: number;
  royaltySplit?: ContractRoyaltySplit;
  minimumPriceDescription?: string;
  remittanceCurrency?: string;
  restrictions?: ContractRestrictionsResource;
  costs?: ContractCostsResource;
}
