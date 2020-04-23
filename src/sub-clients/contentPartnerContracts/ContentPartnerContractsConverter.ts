import { ContentPartnerContractDates } from './model/ContentPartnerContractDates';
import moment from 'moment';
import { ContentPartnerContract } from './model/ContentPartnerContract';
import { ContentPartnerContractRequest } from './requests/ContentPartnerContractRequest';
import { ContentPartnerContractResource } from './resources/ContentPartnerContractResource';

export class ContentPartnerContractsConverter {
  public static toRequest(
    contract: Omit<ContentPartnerContract, 'id'>,
  ): ContentPartnerContractRequest {
    const { contractDates, ...rest } = contract;
    const datesRequest = this.formatDates(contractDates);
    return {
      ...rest,
      contractDates: datesRequest,
    };
  }

  public static formatDates(
    contractDates?: ContentPartnerContractDates,
  ): { start?: string; end?: string } {
    return {
      start: contractDates?.start?.format('YYYY-MM-DD'),
      end: contractDates?.end?.format('YYYY-MM-DD'),
    };
  }

  public static fromResource(
    resource: ContentPartnerContractResource,
  ): ContentPartnerContract {
    const { contractDates, _links, ...rest } = resource;
    const startDate = contractDates?.start;
    const endDate = contractDates?.end;
    const dates = {
      start: startDate ? moment(startDate) : undefined,
      end: endDate ? moment(endDate) : undefined,
    };
    return {
      ...rest,
      contractDates: dates,
    };
  }
}
