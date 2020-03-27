import { ContentPartnerContractDatesResource } from '../resources/ContentPartnerContractDatesResource';
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
}
