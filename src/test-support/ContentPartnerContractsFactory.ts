import moment from 'moment';
import { ContentPartnerContract } from '../sub-clients/contentPartnerContracts/model/ContentPartnerContract';
import { ContentPartnerContractResource } from '../sub-clients/contentPartnerContracts/resources/ContentPartnerContractResource';

export class ContentPartnerContractFactory {
  public static sample(contract: Partial<ContentPartnerContract> = {}) {
    return {
      id: 'some-id',
      contentPartnerName: 'some-name',
      contractDocument: 'http://somedocument.com',
      contractDates: { start: moment('2012-01-31'), end: moment('2012-02-01') },
      daysBeforeTerminationWarning: 100,
      yearsForMaximumLicense: 10,
      daysForSellOffPeriod: 20,
      royaltySplit: {
        streaming: 20.5,
        download: 10,
      },
      minimumPriceDescription: 'a minimum price description',
      remittanceCurrency: 'GBP',
      ...contract,
    };
  }
}

export class ContentPartnerContractResourceFactory {
  public static sample(
    resource: Partial<ContentPartnerContractResource> = {},
  ): ContentPartnerContractResource {
    return {
      id: 'some-id',
      contentPartnerName: 'some-name',
      contractDocument: 'http://somedocument.com',
      contractDates: { start: '2012-01-31', end: '2012-02-01' },
      daysBeforeTerminationWarning: 100,
      yearsForMaximumLicense: 10,
      daysForSellOffPeriod: 20,
      royaltySplit: {
        streaming: 20.5,
        download: 10,
      },
      minimumPriceDescription: 'a minimum price description',
      remittanceCurrency: 'GBP',
      _links: {},
      ...resource,
    };
  }
}
