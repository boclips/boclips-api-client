import { InteractionObject, Matchers } from '@pact-foundation/pact';

const { eachLike, like } = Matchers;

export const createHttpFeed: InteractionObject = {
  state: undefined,
  uponReceiving: 'POST feed',
  withRequest: {
    method: 'POST',
    path: `/v1/http-feeds`,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: like({
      name: 'Feed Test',
      url: 'url',
      provider: 'Youtube',
      format: 'YOUTUBE',
    }),
  },
  willRespondWith: {
    status: 201,
  },
};

export const getHttpFeeds = (provider: string): InteractionObject => ({
  state: undefined,
  uponReceiving: 'GET http feeds',
  withRequest: {
    method: 'GET',
    path: `/v1/http-feeds`,
    query: `provider=${provider}`,
  },
  willRespondWith: {
    status: 200,
    headers: {
      'Content-Type': 'application/hal+json;charset=UTF-8',
    },
    body: {
      _embedded: {
        httpFeeds: eachLike({
          name: 'test name',
          url: 'test url',
          provider,
          videoMetadataFormat: 'YOUTUBE',
        }),
      },
    },
  },
});
