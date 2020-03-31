import { ContentPartnerContractRestrictionsResource } from '../resources/ContentPartnerContractRestrictionsResource';
import { ContentPartnerContractDates } from './ContentPartnerContractDates';
import { ContentPartnerContractRoyaltySplit } from './ContentPartnerContractRoyaltySplit';
import { ContentPartnerContractCostsResource } from '../resources/ContentPartnerContractCostsResource';

export interface ContentPartnerContract {
  id: string;
  contentPartnerName: string;
  contractDocument?: string;
  contractDates?: ContentPartnerContractDates;
  daysBeforeTerminationWarning?: number;
  yearsForMaximumLicense?: number;
  daysForSellOffPeriod?: number;
  royaltySplit?: ContentPartnerContractRoyaltySplit;
  minimumPriceDescription?: string;
  remittanceCurrency?: string;
  restrictions?: ContentPartnerContractRestrictionsResource;
  costs?: ContentPartnerContractCostsResource;
}
