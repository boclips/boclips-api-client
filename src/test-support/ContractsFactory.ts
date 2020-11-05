import dayjs from '../dayjs/index';
import { Contract } from '../types';
import { ContractResource } from '../sub-clients/contracts/resources/ContractResource';

export class ContractFactory {
  public static sample(contract: Partial<Contract> = {}) {
    return {
      id: 'some-id',
      contentPartnerName: 'some-name',
      contractDocument: 'http://somedocument.com',
      contractDates: { start: dayjs('2012-01-31'), end: dayjs('2012-02-01') },
      contractIsRolling: true,
      daysBeforeTerminationWarning: 100,
      yearsForMaximumLicense: 10,
      daysForSellOffPeriod: 20,
      royaltySplit: {
        streaming: 20.5,
        download: 10,
      },
      minimumPriceDescription: 'a minimum price description',
      remittanceCurrency: 'GBP',
      restrictions: {
        clientFacing: [
          'client facing restriction 1',
          'client facing restriction 2',
        ],
        territory: 'territory restriction',
        licensing: 'licensing restriction',
        editing: 'editing restriction',
        marketing: 'marketing restriction',
        companies: 'companies restriction',
        payout: 'payout restriction',
        other: 'other restriction',
      },
      costs: {
        minimumGuarantee: [1.1, 2.3],
        upfrontLicense: 4.4,
        technicalFee: 5.5,
        recoupable: true,
      },
      ...contract,
    };
  }
}

export class ContractResourceFactory {
  public static sample(
    resource: Partial<ContractResource> = {},
  ): ContractResource {
    return {
      id: 'some-id',
      contentPartnerName: 'some-name',
      contractDocument: 'http://somedocument.com',
      contractDates: { start: '2012-01-31', end: '2012-02-01' },
      contractIsRolling: true,
      daysBeforeTerminationWarning: 100,
      yearsForMaximumLicense: 10,
      daysForSellOffPeriod: 20,
      royaltySplit: {
        streaming: 20.5,
        download: 10,
      },
      minimumPriceDescription: 'a minimum price description',
      remittanceCurrency: 'GBP',
      restrictions: {
        clientFacing: [
          'client facing restriction 1',
          'client facing restriction 2',
        ],
        territory: 'territory restriction',
        licensing: 'licensing restriction',
        editing: 'editing restriction',
        marketing: 'marketing restriction',
        companies: 'companies restriction',
        payout: 'payout restriction',
        other: 'other restriction',
      },
      costs: {
        minimumGuarantee: [1.1, 2.3],
        upfrontLicense: 4.4,
        technicalFee: 5.5,
        recoupable: true,
      },
      _links: {},
      ...resource,
    };
  }
}
