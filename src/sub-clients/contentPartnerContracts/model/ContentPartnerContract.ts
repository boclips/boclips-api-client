import { ContentPartnerContractCostsResource } from '../resources/ContentPartnerContractCostsResource';
import { ContentPartnerContractRestrictionsResource } from '../resources/ContentPartnerContractRestrictionsResource';
import { ContentPartnerContractDates } from './ContentPartnerContractDates';
import { ContentPartnerContractRoyaltySplit } from './ContentPartnerContractRoyaltySplit';

export interface ContentPartnerContract {
  id: string;
  contentPartnerName: string;
  contractDocument?: string | null;
  contractDates?: ContentPartnerContractDates;
  contractIsRolling?: boolean;
  daysBeforeTerminationWarning?: number;
  yearsForMaximumLicense?: number;
  daysForSellOffPeriod?: number;
  royaltySplit?: ContentPartnerContractRoyaltySplit;
  minimumPriceDescription?: string;
  remittanceCurrency?: string;
  restrictions?: ContentPartnerContractRestrictionsResource;
  costs?: ContentPartnerContractCostsResource;
}
