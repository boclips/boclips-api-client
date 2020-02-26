import { InteractionObject, Matchers } from '@pact-foundation/pact';
import { term } from '@pact-foundation/pact/dsl/matchers';
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
  uponReceiving: 'PATCH content partner',
  withRequest: {
    method: 'PATCH',
    path: `/v1/content-partners/${id}`,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: {
      name: 'TED',
      ageRanges: ['early-years'],
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
  /**/
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
          ids: ['123'],
        },
        legalRestriction: {
          text: 'a legal restriction',
          id: '2',
        },
        description: 'this is a description',
        language: { code: 'spa', name: 'Spanish' },
        contentCategories: eachLike({ key: 'ANY_KEY', label: 'Any label' }),
        awards: 'Big famous award',
        notes: 'Something noteworthy',
        hubspotId: '666',
        contentTypes: ['NEWS', 'STOCK'],
        oneLineDescription: '30-year-old mulberry field',
        marketingInformation: like({ status: 'IN_PROGRESS' }),
        pedagogyInformation: like({
          curriculumAligned: '123',
          educationalResources: '456',
          isTranscriptProvided: true,
          subjects: [
            '5cb499c9fd5beb428189454b',
            '5cb499c9fd5beb428189454d',
            '5cb499c9fd5beb428189454e',
          ],
          bestForTags: [
            '5d3ac0175b3f3b7ba335e104',
            '5d3ac0185b3f3b7ba335e106',
            '5d3ac0185b3f3b7ba335e105',
          ],
          ageRanges: like({
            min: 10,
            max: 20,
            label: '10-20',
            ids: ['123'],
          }),
        }),
      },
    }),
  },
});

export const get404ContentPartner = (id: string): InteractionObject => ({
  state: undefined,
  uponReceiving: 'GET missing content partner',
  withRequest: {
    method: 'GET',
    path: `/v1/content-partners/${id}`,
  },
  willRespondWith: {
    status: 404,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: like({
      error: 'lol',
      message: "you're awesome",
      path: `/v1/content-partners/${id}`,
      status: 404,
      timestamp: new Date(Date.parse('01/01/2000')).toUTCString(),
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
      description: request.description,
    },
  },
  willRespondWith: {
    status: 201,
  },
});

export const getSignedLink = (filename: string): InteractionObject => ({
  state: undefined,
  uponReceiving: 'POST content partners signed upload link',
  withRequest: {
    method: 'POST',
    path: `/v1/content-partners/signed-upload-link`,
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
      location: term({
        generate: `http://fakeurl.com/${filename.replace('.', '_')}_signed_url`,
        matcher: `http.*`,
      }),
    },
  },
});
