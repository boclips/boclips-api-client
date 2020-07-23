import { ContentPackageConverter } from "./ContentPackageConverter";

describe('ContentPackageConverter', () => {
  it('converts single contentPackage', () => {
    const converted = ContentPackageConverter.convertPackage(resourceData);

    expect(converted).toEqual({
      id: '5e6bbe1e8e91eae3fb4977ca',
      name: 'Classroom',
      accessRules: [
        {
          type: 'ExcludedVideos',
          videoIds: [
            "5c5db74e7f45b9000159bf3f"
          ]
        },
        {
          type: 'ExcludedChannels',
          channelIds: [
            "5cfe89e4336c6d2d0aa7c00d"
          ],
        },
        {
          type: 'IncludedDistributionMethods',
          distributionMethods: [
            "STREAM"
          ],
        },
      ]
    });
  });

  const resourceData = {
    "id": "5e6bbe1e8e91eae3fb4977ca",
    "name": "Classroom",
    "accessRules": [
      {
        "@c": ".AccessRuleResource$ExcludedVideos",
        "id": "5e6bbeeb8e91eae3fb498305",
        "name": "Bad videos for teachers",
        "videoIds": [
          "5c5db74e7f45b9000159bf3f"
        ],
        "type": "ExcludedVideos"
      },
      {
        "@c": ".AccessRuleResource$ExcludedChannels",
        "id": "5e6bbfaa8e91eae3fb498d24",
        "name": "Bad channels",
        "channelIds": [
          "5cfe89e4336c6d2d0aa7c00d"
        ],
        "type": "ExcludedChannels"
      },
      {
        "@c": ".AccessRuleResource$IncludedDistributionMethod",
        "id": "5e7cec118e91eae3fbc909b2",
        "name": "Stream only",
        "distributionMethods": [
          "STREAM"
        ],
        "type": "IncludedDistributionMethods"
      }
    ],
    "_links": {
      "self": {
        "href": "https://api.staging-boclips.com/v1/content-packages/5e6bbe1e8e91eae3fb4977ca"
      }
    }
  }
});
