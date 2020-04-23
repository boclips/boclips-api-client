import {
  ContentPartnerContractDates,
  ContentPartnerContractRoyaltySplit,
} from '../../../types';
import { ContentPartnerContractRestrictionsResource } from '../resources/ContentPartnerContractRestrictionsResource';
import { ContentPartnerContractCostsResource } from '../resources/ContentPartnerContractCostsResource';

export interface UpdateContractRequest {
  contentPartnerName?: string;
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
