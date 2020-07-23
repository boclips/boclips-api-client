import { InteractionObject, Matchers } from '@pact-foundation/pact';
import { like } from "@pact-foundation/pact/dsl/matchers";

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
          id: '5f10296408f6a1cbd2745c98',
          name: 'DO NOT EDIT api-client fixture',
          accessRules: eachLike({
            "@c": ".AccessRuleResource$ExcludedVideos",
            id: "5e6bbeeb8e91eae3fb498305",
            name: "Bad videos for teachers",
            type: "ExcludedVideos"
          }),
        }),
      },
    },
  },
};

export const getContentPackage = (id: string): InteractionObject => {
  return {
    state: undefined,
    uponReceiving: 'GET content package',
    withRequest: {
      method: 'GET',
      path: `/v1/content-packages/${id}`,
    },
    willRespondWith: {
      status: 200,
      headers: {
        'Content-Type': 'application/hal+json;charset=UTF-8',
      },
      body: {
        id: id,
        name: "DO NOT EDIT api-client fixture",
        accessRules: [
          {
            "@c": ".AccessRuleResource$ExcludedVideos",
            id: like("5e6bbeeb8e91eae3fb498305"),
            name: "Bad videos for teachers",
            videoIds: eachLike(
              "5c5db74e7f45b9000159bf3f"
            ),
            type: "ExcludedVideos"
          },
          {
            "@c": ".AccessRuleResource$ExcludedChannels",
            id: like("5e6bbfaa8e91eae3fb498d24"),
            name: "Bad channels",
            channelIds: eachLike(
              "5cfe89e4336c6d2d0aa7c00d"
            ),
            type: "ExcludedChannels"
          },
          {
            "@c": ".AccessRuleResource$IncludedDistributionMethod",
            id: like("5e7cec118e91eae3fbc909b2"),
            name: "Stream only",
            distributionMethods: [
              "STREAM"
            ],
            type: "IncludedDistributionMethods"
          }
        ],
        _links: {
          self: {
            href: "https://api.staging-boclips.com/v1/content-packages/5f10296408f6a1cbd2745c98"

          }
        }
      },
    },
  };
};

export const updateContentPackage = (
  id: string,
  name: string,
): InteractionObject => {
  return {
    state: undefined,
    uponReceiving: 'PUT content packages',
    withRequest: {
      method: 'PUT',
      path: `/v1/content-packages/${id}`,
      body: {
        name: name,
        accessRules: [
        {
          videoIds: [
              "5c5db74e7f45b9000159bf3f"
          ],
          type: "ExcludedVideos"
        },
        {
          channelIds: [
              "5cfe89e4336c6d2d0aa7c00d"
          ],
          type: "ExcludedChannels"
        },
        {
          distributionMethods: [
            "STREAM"
          ],
          type: "IncludedDistributionMethods"
        }
      ]
      }
    },
    willRespondWith: {
      status: 200,
      headers: {
        'Content-Type': 'application/hal+json;charset=UTF-8',
      },
      body: {
        id: id,
        name: "DO NOT EDIT api-client fixture",
        accessRules: [
          {
            "@c": ".AccessRuleResource$ExcludedVideos",
            id: like("5e6bbeeb8e91eae3fb498305"),
            name: like(""),
            videoIds: eachLike(
                "5c5db74e7f45b9000159bf3f"
            ),
            type: "ExcludedVideos"
          },
          {
            "@c": ".AccessRuleResource$ExcludedChannels",
            id: like("5e6bbfaa8e91eae3fb498d24"),
            name: like(""),
            channelIds: eachLike(
                "5cfe89e4336c6d2d0aa7c00d"
            ),
            type: "ExcludedChannels"
          },
          {
            "@c": ".AccessRuleResource$IncludedDistributionMethod",
            id: like("5e7cec118e91eae3fbc909b2"),
            name: like(""),
            distributionMethods: [
              "STREAM"
            ],
            type: "IncludedDistributionMethods"
          }
        ],
        _links: {
          self: {
            href: "https://api.staging-boclips.com/v1/content-packages/5f10296408f6a1cbd2745c98"

          }
        }
      },
    },
  };
};
