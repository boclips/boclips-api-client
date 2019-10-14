import { InteractionObject, Matchers } from '@pact-foundation/pact';
import { provider } from '../../../pactSetup';

const { eachLike, like } = Matchers;

const createContentPartner = (id: string) => ({
  id,
  name: 'a name',
  ageRange: like({ min: 10, max: 15 }),
  official: true,
  currency: 'USD',
  legalRestrictions: eachLike({ id: '2', text: 'No restrictions' }),
  distributionMethods: eachLike('STREAM'),
  _links: like({
    self: {
      href: `${provider.mockService.baseUrl}/v1/content-partners/2`,
      templated: false,
    },
  }),
});

export const getContentPartners = (): InteractionObject => ({
  state: undefined,
  uponReceiving: 'GET content partners',
  withRequest: {
    method: 'GET',
    path: '/v1/content-partners',
  },
  willRespondWith: {
    status: 200,
    headers: {
      'Content-Type': 'application/hal+json;charset=UTF-8',
    },
    body: {
      _embedded: {
        contentPartners: eachLike(createContentPartner('1')),
      },
    },
  },
});

export const getContentPartner = (id: string): InteractionObject => ({
  state: undefined,
  uponReceiving: 'GET content partner',
  withRequest: {
    method: 'GET',
    path: `/v1/content-partners/${id}`,
  },
  willRespondWith: {
    status: 200,
    headers: {
      'Content-Type': 'application/hal+json;charset=UTF-8',
    },
    body: like(createContentPartner(id)),
  },
});
