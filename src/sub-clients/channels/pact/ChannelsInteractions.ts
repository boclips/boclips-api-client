import { existingContractFromStaging } from './../../contracts/pact/ContractsInteractions';
import { InteractionObject, Matchers } from '@pact-foundation/pact';
import { term } from '@pact-foundation/pact/dsl/matchers';
import { provider } from '../../../pact-support/pactSetup';
import contentTypeRegex from '../../../test-support/HalJsonContentTypeRegex';

const { eachLike, like } = Matchers;

export const existingChannelFromStaging = '5cf140c4c1475c47f7178678';

const createChannelWithMandatoryFields = (id: string) => ({
  id: like(id),
  name: 'a name',
  _links: like({
    self: {
      href: `${provider.mockService.baseUrl}/v1/channels/${id}`,
    },
  }),
});

export const getChannelsInteraction = (): InteractionObject => ({
  state: undefined,
  uponReceiving: 'GET channels',
  withRequest: {
    method: 'GET',
    path: '/v1/channels',
  },
  willRespondWith: {
    status: 200,
    headers: {
      'Content-Type': Matchers.term({
        generate: 'application/hal+json;charset=UTF-8',
        matcher: contentTypeRegex,
      }),
    },
    body: {
      _embedded: {
        channels: eachLike(
          createChannelWithMandatoryFields(existingChannelFromStaging),
        ),
      },
    },
  },
});

export const updateChannel = (id: string): InteractionObject => ({
  state: undefined,
  uponReceiving: 'PATCH channel',
  withRequest: {
    method: 'PATCH',
    path: `/v1/channels/${id}`,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: {
      name: 'TED',
      ageRanges: ['early-years'],
      deliveryFrequency: 'P3M',
      contractId: existingContractFromStaging,
      ingest: {
        type: 'MRSS',
        urls: ['https://mrss.feed'],
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
      'Content-Type': Matchers.term({
        generate: 'application/hal+json;charset=UTF-8',
        matcher: contentTypeRegex,
      }),
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

export const getChannelInteraction = (id: string): InteractionObject => ({
  state: undefined,
  uponReceiving: 'GET channel',
  withRequest: {
    method: 'GET',
    path: `/v1/channels/${id}`,
  },
  /**/
  willRespondWith: {
    status: 200,
    headers: {
      'Content-Type': Matchers.term({
        generate: 'application/hal+json;charset=UTF-8',
        matcher: contentTypeRegex,
      }),
    },
    body: like({
      ...createChannelWithMandatoryFields(id),
      ...{
        currency: 'USD',
        distributionMethods: eachLike('STREAM', { min: 1 }),
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
        marketingInformation: like({
          status: 'IN_PROGRESS',
          logos: ['logo1.png', 'logo2.png'],
          showreel: 'showreel.mkv',
          sampleVideos: ['sample1.avi', 'sample2.avi'],
        }),
        ingest: {
          type: 'MANUAL',
        },
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

export const get404Channel = (id: string): InteractionObject => ({
  state: undefined,
  uponReceiving: 'GET missing channel',
  withRequest: {
    method: 'GET',
    path: `/v1/channels/${id}`,
  },
  willRespondWith: {
    status: 404,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: like({
      error: 'lol',
      message: "you're awesome",
      path: `/v1/channels/${id}`,
      status: 404,
      timestamp: new Date(Date.parse('01/01/2000')).toUTCString(),
    }),
  },
});

export const getSignedLink = (filename: string): InteractionObject => ({
  state: undefined,
  uponReceiving: 'POST channels signed upload link',
  withRequest: {
    method: 'POST',
    path: `/v1/channels/signed-upload-link`,
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
