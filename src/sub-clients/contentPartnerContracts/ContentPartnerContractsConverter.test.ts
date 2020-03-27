import { ContentPartnerContractResourceFactory } from '../../test-support/ContentPartnerContractsFactory';
import { ContentPartnerContractsConverter } from './ContentPartnerContractsConverter';

describe('converting a content partner contract', () => {
  it('coverts from a resource to a contract and then to a request', () => {
    const resource = ContentPartnerContractResourceFactory.sample();
    const request = ContentPartnerContractsConverter.toRequest(
      ContentPartnerContractsConverter.fromResource(resource),
    );

    expect(request.contentPartnerName).toEqual(resource.contentPartnerName);
    expect(request.contractDocument).toEqual(resource.contractDocument);
    expect(request.contractDates).toEqual(resource.contractDates);
    expect(request.daysBeforeTerminationWarning).toEqual(
      resource.daysBeforeTerminationWarning,
    );
    expect(request.yearsForMaximumLicense).toEqual(
      resource.yearsForMaximumLicense,
    );
    expect(request.daysForSellOffPeriod).toEqual(resource.daysForSellOffPeriod);
    expect(request.royaltySplit).toEqual(resource.royaltySplit);
    expect(request.minimumPriceDescription).toEqual(
      resource.minimumPriceDescription,
    );
    expect(request.remittanceCurrency).toEqual(resource.remittanceCurrency);
  });
});
