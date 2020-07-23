import { InteractionObject, Matchers } from '@pact-foundation/pact';

const { eachLike } = Matchers;

export const getContentPackages: InteractionObject = {
  state: undefined,
  uponReceiving: 'GET content packages',
  withRequest: {
    method: 'GET',
    path: '/v1/content-packages',
  },
  willRespondWith: {
    status: 200,
    headers: {
      'Content-Type': 'application/hal+json;charset=UTF-8',
    },
    body: {
      _embedded: {
        contentPackages: eachLike({
          id: '5e6bbe1e8e91eae3fb4977ca',
          name: 'My content package',
          accessRules: eachLike({
            type: 'IncludedVideos',
            videoIds: ['123', '456'],
          }),
        }),
      },
    },
  },
};

export const getContentPackage = (): InteractionObject => {
  return {
    state: undefined,
    uponReceiving: 'GET content package',
    withRequest: {
      method: 'GET',
      path: '/v1/content-packages',
    },
    willRespondWith: {
      status: 200,
      headers: {
        'Content-Type': 'application/hal+json;charset=UTF-8',
      },
      body: {
        id: "5e6bbe1e8e91eae3fb4977ca",
        name: "Classroom",
        accessRules: eachLike(
          {
            "@c": ".AccessRuleResource$ExcludedVideos",
            id: "5e6bbeeb8e91eae3fb498305",
            name: "Bad videos for teachers",
            videoIds: [
              "5c5db74e7f45b9000159bf3f"
            ],
            type: "ExcludedVideos"
          }),
        _links: {
          self: {
            href: "https://api.staging-boclips.com/v1/content-packages/5e6bbe1e8e91eae3fb4977ca"
          }
        }
      },
    },
  };
};

export const updateContentPackage = (
  id: string,
  name: string,
  videoIds: string[],
): InteractionObject => {
  return {
    state: undefined,
    uponReceiving: 'PUT content packages',
    withRequest: {
      method: 'PUT',
      path: '/v1/content-packages',
    },
    willRespondWith: {
      status: 200,
      headers: {
        'Content-Type': 'application/hal+json;charset=UTF-8',
      },
      body: {
        _embedded: {
          contentPackages: eachLike({
            id: id,
            name: name,
            accessRules: eachLike({
              type: 'IncludedVideos',
              videoIds: videoIds,
            }),
          }),
        },
      },
    },
  };
};
