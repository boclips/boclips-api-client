import { InteractionObject, Matchers } from '@pact-foundation/pact';
import { somethingLike } from '@pact-foundation/pact/dsl/matchers';
import { provider } from '../../../pact-support/pactSetup';

const { like } = Matchers;

export const existingContentPartnerContractFromStaging =
  '5e7cbc9ddb7790aa17629972';

const createContentPartnerContractWithMandatoryFields = (id: string) => ({
  id: like(id),
  contentPartnerName: 'a name',
  _links: like({
    self: {
      href: `${provider.mockService.baseUrl}/v1/content-partners-contracts/${id}`,
    },
  }),
});

export const getContentPartnerContractInteraction = (
  id: string,
): InteractionObject => ({
  state: undefined,
  uponReceiving: 'GET content partner contracts',
  withRequest: {
    method: 'GET',
    path: `/v1/content-partner-contracts/${id}`,
  },
  willRespondWith: {
    status: 200,
    headers: {
      'Content-Type': 'application/hal+json;charset=UTF-8',
    },
    body: like({
      ...createContentPartnerContractWithMandatoryFields(id),
      ...{
        contentPartnerName: 'some-name',
        contractDocument: 'http://somedocument.com',
        contractDates: like({
          start: '2012-01-31',
          end: '2012-02-01',
        }),
        daysBeforeTerminationWarning: 100,
        yearsForMaximumLicense: 10,
        daysForSellOffPeriod: 20,
        royaltySplit: like({
          streaming: 20.5,
          download: 10,
        }),
        minimumPriceDescription: 'a minimum price description',
        remittanceCurrency: 'GBP',
        restrictions: {
          clientFacing: somethingLike([
            'client facing restriction 1',
            'client facing restriction 2',
          ]),
          territory: 'territory restriction',
          licensing: 'licensing restriction',
          editing: 'editing restriction',
          marketing: 'marketing restriction',
          companies: 'companies restriction',
          payout: 'payout restriction',
          other: 'other restriction',
        },
        costs: {
          minimumGuarantee: somethingLike([1.1, 2.3]),
          upfrontLicense: 4.4,
          technicalFee: 5.5,
          recoupable: true,
        },
      },
    }),
  },
});
