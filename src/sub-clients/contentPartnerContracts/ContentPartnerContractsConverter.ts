import moment from 'moment';
import { ContentPartnerContract } from './model/ContentPartnerContract';
import { ContentPartnerContractRequest } from './requests/ContentPartnerContractRequest';
import { ContentPartnerContractResource } from './resources/ContentPartnerContractResource';

export class ContentPartnerContractsConverter {
  public static toRequest(
    contract: ContentPartnerContract,
  ): ContentPartnerContractRequest {
    const { contractDates, ...rest } = contract;
    const datesRequest = {
      start: contractDates?.start?.format('YYYY-MM-DD'),
      end: contractDates?.end?.format('YYYY-MM-DD'),
    };
    return {
      ...rest,
      contractDates: datesRequest,
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
