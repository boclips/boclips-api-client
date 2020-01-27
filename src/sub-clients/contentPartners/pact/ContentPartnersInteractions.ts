import { InteractionObject, Matchers } from '@pact-foundation/pact';
import { provider } from '../../../pact-support/pactSetup';
import { ContentPartnerRequest } from '../model/ContentPartnerRequest';

const { eachLike, like } = Matchers;

export const existingContentPartnerFromStaging = '5cf140c4c1475c47f7178678';

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
        contentPartners: eachLike(
          createContentPartnerWithMandatoryFields(
            existingContentPartnerFromStaging,
          ),
        ),
      },
    },
  },
});

export const updateContentPartner = (id: string): InteractionObject => ({
  state: undefined,
  uponReceiving: 'PUT content partner',
  withRequest: {
    method: 'PUT',
    path: `/v1/content-partners/${id}`,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: {
      name: 'TED',
      ageRange: {
        min: 3,
        max: 12,
      },
    },
  },
  willRespondWith: {
    status: 204,
  },
});

export const getContentCategories = (): InteractionObject => ({
  state: undefined,
  uponReceiving: 'GET content categories',
  withRequest: {
    method: 'GET',
    path: `/v1/content-categories`,
  },
  willRespondWith: {
    status: 200,
    headers: {
      'Content-Type': 'application/hal+json;charset=UTF-8',
    },
    body: {
      _embedded: {
        contentCategories: eachLike(
          { key: 'key 1', label: 'label 1' },
          { min: 1 },
        ),
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
        legalRestriction: {
          text: 'a legal restriction',
          id: '2',
        },
      },
    }),
  },
});

export const createContentPartner = (
  request: ContentPartnerRequest,
): InteractionObject => ({
  state: undefined,
  uponReceiving: 'POST content-partners',
  withRequest: {
    method: 'POST',
    path: `/v1/content-partners`,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: {
      name: request.name,
      accreditedToYtChannelId: request.accreditedToYtChannelId,
      legalRestrictions: request.legalRestrictions,
      ageRange: request.ageRange,
      distributionMethods: request.distributionMethods,
      currency: request.currency,
    },
  },
  willRespondWith: {
    status: 201,
  },
});
