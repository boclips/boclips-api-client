import { InteractionObject, Matchers } from '@pact-foundation/pact';
import {
  eachLike,
  somethingLike,
  term,
} from '@pact-foundation/pact/dsl/matchers';
import { provider } from '../../../pact-support/pactSetup';
import { PageRequest } from '../../common/model/PageRequest';

const { like } = Matchers;

export const existingContractFromStaging = '5e7cbc9ddb7790aa17629972';

const createContractWithMandatoryFields = (id: string) => ({
  id: like(id),
  contentPartnerName: 'a name',
  _links: like({
    self: {
      href: `${provider.mockService.baseUrl}/v1/contracts/${id}`,
    },
  }),
});

export const getContractInteraction = (id: string): InteractionObject => ({
  state: undefined,
  uponReceiving: 'GET a contract',
  withRequest: {
    method: 'GET',
    path: `/v1/contracts/${id}`,
  },
  willRespondWith: {
    status: 200,
    headers: {
      'Content-Type': 'application/hal+json;charset=UTF-8',
    },
    body: like({
      ...createContractWithMandatoryFields(id),
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

export const updateContract = (id: string): InteractionObject => ({
  state: undefined,
  uponReceiving: 'PATCH contract',
  withRequest: {
    method: 'PATCH',
    path: `/v1/contracts/${id}`,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: somethingLike({
      contractDates: somethingLike({
        start: '2012-01-31' || null,
        end: '2012-02-01' || null,
      }),
    }),
  },
  willRespondWith: {
    status: 204,
  },
});

export const getContractsInteraction = (
  pageRequest: PageRequest,
): InteractionObject => ({
  state: undefined,
  uponReceiving: 'GET all contracts',
  withRequest: {
    method: 'GET',
    path: `/v1/contracts`,
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
          ...createContractWithMandatoryFields('123'),
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
  uponReceiving: 'POST contracts signed upload link',
  withRequest: {
    method: 'POST',
    path: `/v1/contracts/signed-upload-link`,
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
