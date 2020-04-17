import { PageRequest } from './../../common/model/PageRequest';
import { InteractionObject, Matchers } from '@pact-foundation/pact';
import {
  somethingLike,
  eachLike,
  term,
} from '@pact-foundation/pact/dsl/matchers';
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
  uponReceiving: 'GET a content partner contract',
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
        contractIsRolling: true,
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

export const updateContentPartnerContract = (
  id: string,
): InteractionObject => ({
  state: undefined,
  uponReceiving: 'PATCH contract content partner',
  withRequest: {
    method: 'PATCH',
    path: `/v1/content-partner-contracts/${id}`,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: somethingLike({
      contentPartnerName: 'new name',
      contractDates: { start: undefined, end: undefined },
    }),
  },
  willRespondWith: {
    status: 204,
  },
});

export const getContentPartnerContractsInteraction = (
  pageRequest: PageRequest,
): InteractionObject => ({
  state: undefined,
  uponReceiving: 'GET all content partner contracts',
  withRequest: {
    method: 'GET',
    path: `/v1/content-partner-contracts`,
    query: {
      page: pageRequest.page + '',
      size: pageRequest.size + '',
    },
  },
  willRespondWith: {
    status: 200,
    headers: {
      'Content-Type': 'application/hal+json;charset=UTF-8',
    },
    body: like({
      _embedded: like({
        contracts: eachLike({
          ...createContentPartnerContractWithMandatoryFields('123'),
        }),
      }),
      page: like({
        number: pageRequest.page,
        size: pageRequest.size,
        totalElements: 1,
        totalPages: 1,
      }),
    }),
  },
});

export const getSignedLink = (filename: string): InteractionObject => ({
  state: undefined,
  uponReceiving: 'POST content partner contracts signed upload link',
  withRequest: {
    method: 'POST',
    path: `/v1/content-partner-contracts/signed-upload-link`,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: {
      filename,
    },
  },
  willRespondWith: {
    status: 204,
    headers: {
      'Access-Control-Expose-Headers': like('location'),
      location: term({
        generate: `http://fakeurl.com/${filename.replace('.', '_')}_signed_url`,
        matcher: `http.*`,
      }),
    },
  },
});
