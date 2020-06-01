import { ContractCostsResource } from '../resources/ContractCostsResource';
import { ContractRestrictionsResource } from '../resources/ContractRestrictionsResource';
import { ContractDates } from './ContractDates';
import { ContractRoyaltySplit } from './ContractRoyaltySplit';

export interface Contract {
  id: string;
  contentPartnerName: string;
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
