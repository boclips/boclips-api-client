import { InteractionObject, Matchers } from '@pact-foundation/pact';
import { provider } from '../pactSetup';

const { eachLike, like } = Matchers;

const createContentPartnerWithMandatoryFields = (id: string) => ({
  id: like(id),
  name: 'a name',
  official: true,
  _links: like({
    self: {
      href: `${provider.mockService.baseUrl}/v1/content-partners/${id}`,
    },
  }),
});

export const getContentPartnersInteraction = (): InteractionObject => ({
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
        contentPartners: eachLike(createContentPartnerWithMandatoryFields('1')),
      },
    },
  },
});

export const getContentPartnerInteraction = (
  id: string,
): InteractionObject => ({
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
    body: like({
      ...createContentPartnerWithMandatoryFields(id),
      ...{
        currency: 'USD',
        distributionMethods: eachLike('STREAM', { min: 1 }),
        ageRange: {
          min: 10,
          max: 20,
          label: '10-20',
        },
        legalRestrictions: {
          text: 'a legal restriction',
          id: '2',
        },
      },
    }),
  },
});
