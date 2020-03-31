import { ContentPartnerContractDatesResource } from '../resources/ContentPartnerContractDatesResource';
import { ContentPartnerContractRestrictionsResource } from '../resources/ContentPartnerContractRestrictionsResource';
import { ContentPartnerContractCostsResource } from '../resources/ContentPartnerContractCostsResource';
import { ContentPartnerContractRoyaltySplitResource } from '../resources/ContentPartnerContractRoyaltySplitResource';

export interface ContentPartnerContractRequest {
  contentPartnerName: string;
  contractDocument?: string;
  contractDates?: ContentPartnerContractDatesResource;
  daysBeforeTerminationWarning?: number;
  yearsForMaximumLicense?: number;
  daysForSellOffPeriod?: number;
  royaltySplit?: ContentPartnerContractRoyaltySplitResource;
  minimumPriceDescription?: string;
  remittanceCurrency?: string;
  restrictions?: ContentPartnerContractRestrictionsResource;
  costs?: ContentPartnerContractCostsResource;
}
