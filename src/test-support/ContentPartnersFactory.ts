import { ChannelResource } from '../sub-clients/channels/resources/ChannelResource';
import { Channel, Link } from '../types';

export class ChannelFactory {
  public static createChannelResource(
    resource: Partial<ChannelResource> = {},
  ): ChannelResource {
    return {
      id: '123',
      name: 'content partner name',
      official: true,
      distributionMethods: [],
      _links: {},
      ...resource,
    };
  }

  public static sample(channel: Partial<Channel> = {}): Channel {
    const id = channel.id || '123';
    return {
      id,
      name: channel.name || 'Test name',
      currency: channel.currency || 'USD',
      legalRestriction: channel.legalRestriction || {
        id: '2',
        text: 'a legal restriction',
      },
      ingest: channel.ingest || { type: 'MANUAL' },
      deliveryFrequency: channel.deliveryFrequency,
      links: channel.links || {
        self: new Link({
          href: `/v1/channels/${id}`,
        }),
      },
      distributionMethods: channel.distributionMethods || ['STREAM'],
      description: channel.description || 'this is a description',
      language: channel.language || { code: 'spa', name: 'Spanish' },
      contentCategories: channel.contentCategories || [
        { key: 'ANY_KEY', label: 'Any label' },
      ],
      awards: channel.awards || 'Big famous award',
      notes: channel.notes || 'Something noteworthy',
      hubspotId: channel.hubspotId || '666',
      contentTypes: channel.contentTypes || ['NEWS', 'STOCK'],
      oneLineDescription:
        channel.oneLineDescription || '30-year-old mulberry field',
      marketingInformation: channel.marketingInformation || {
        status: 'IN_PROGRESS',
        logos: ['logo1.png', 'logo2.png'],
        showreel: 'showreel.mkv',
        sampleVideos: ['sample1.avi', 'sample2.avi'],
      },
      pedagogyInformation: channel.pedagogyInformation || {
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
        ageRanges: {
          min: 10,
          max: 20,
          label: '10-20',
          ids: ['123'],
        },
      },
      contractId: '123',
      contractName: 'the contract',
    };
  }
}
