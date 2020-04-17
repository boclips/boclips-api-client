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
    expect(request.restrictions?.clientFacing).toEqual(
      resource.restrictions?.clientFacing,
    );
    expect(request.restrictions?.companies).toEqual(
      resource.restrictions?.companies,
    );
    expect(request.restrictions?.editing).toEqual(
      resource.restrictions?.editing,
    );
    expect(request.restrictions?.licensing).toEqual(
      resource.restrictions?.licensing,
    );
    expect(request.restrictions?.marketing).toEqual(
      resource.restrictions?.marketing,
    );
    expect(request.restrictions?.other).toEqual(resource.restrictions?.other);
    expect(request.restrictions?.payout).toEqual(resource.restrictions?.payout);
    expect(request.restrictions?.territory).toEqual(
      resource.restrictions?.territory,
    );
    expect(request.costs?.minimumGuarantee).toEqual(
      resource.costs?.minimumGuarantee,
    );
    expect(request.costs?.upfrontLicense).toEqual(
      resource.costs?.upfrontLicense,
    );
    expect(request.costs?.technicalFee).toEqual(resource.costs?.technicalFee);
    expect(request.costs?.recoupable).toEqual(resource.costs?.recoupable);
  });
});
