import { ContractDates } from './model/ContractDates';
import dayjs from '../..//dayjs/index';
import { Contract } from './model/Contract';
import { ContractRequest } from './requests/ContractRequest';
import { ContractResource } from './resources/ContractResource';

export class ContractsConverter {
  public static toRequest(contract: Omit<Contract, 'id'>): ContractRequest {
    const { contractDates, ...rest } = contract;
    const datesRequest = this.formatDates(contractDates);
    return {
      ...rest,
      contractDates: datesRequest,
    };
  }

  public static formatDates(
    contractDates?: ContractDates,
  ): { start?: string; end?: string } {
    return {
      start: contractDates?.start?.format('YYYY-MM-DD'),
      end: contractDates?.end?.format('YYYY-MM-DD'),
    };
  }

  public static fromResource(resource: ContractResource): Contract {
    const { contractDates, _links, ...rest } = resource;
    const startDate = contractDates?.start;
    const endDate = contractDates?.end;
    const dates = {
      start: startDate ? dayjs(startDate) : undefined,
      end: endDate ? dayjs(endDate) : undefined,
    };
    return {
      ...rest,
      contractDates: dates,
    };
  }
}
