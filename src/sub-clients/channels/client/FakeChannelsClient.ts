import moment from 'moment';
import { ChannelFactory } from '../../../test-support';
import { BoclipsApiError, Link } from '../../../types';
import { Clearable } from '../../common/utils/Clearable';
import { ContentCategories, ContentCategory } from '../model/ContentCategories';
import { Channel } from '../model/Channel';
import { ChannelRequest } from '../model/ChannelRequest';
import { ChannelsClient } from './ChannelsClient';

export class FakeChannelsClient implements ChannelsClient, Clearable {
  private channels: Channel[] = [];

  private contentCategories: ContentCategory[] = [
    { key: 'key 1', label: 'label 1' },
    { key: 'key 2', label: 'label 2' },
  ];

  public create(request: ChannelRequest): Promise<void> {
    const id = request.name! + Date.now();

    const fakeAgeRangeRequest = {
      min: 3,
      max: 7,
      label: '3-7',
      ids: ['early-years'],
    };

    this.channels.push({
      id,
      name: request.name!,
      currency: request.currency,
      legalRestriction: request.legalRestrictions,
      distributionMethods: request.distributionMethods!,
      contentCategories: request.contentCategories?.map(key => ({
        key,
        label: `Label: ${key}`,
      })),
      description: request.description,
      awards: request.awards,
      notes: request.notes,
      hubspotId: request.hubspotId,
      language: { code: request.language!, name: request.language! },
      contentTypes: request.contentTypes,
      oneLineDescription: request.oneLineDescription,
      marketingInformation: request.marketingInformation,
      pedagogyInformation: {
        curriculumAligned: request.curriculumAligned!,
        educationalResources: request.educationalResources!,
        isTranscriptProvided: request.isTranscriptProvided!,
        subjects: request.subjects!,
        bestForTags: request.bestForTags!,
        ageRanges: fakeAgeRangeRequest,
      },
      ingest: { type: 'MANUAL' },
      deliveryFrequency: moment.duration(6, 'months'),
      links: { self: new Link({ href: `/v1/channels/${id}` }) },
    });

    return Promise.resolve();
  }

  public insertFixture(channel: Partial<Channel>) {
    this.channels.push(ChannelFactory.sample(channel));
  }

  public getContentCategories(): Promise<ContentCategories> {
    return Promise.resolve({ categories: this.contentCategories });
  }

  public getAll(): Promise<Channel[]> {
    return Promise.resolve(this.channels);
  }

  public get(id: string): Promise<Channel> {
    const retrievedContentPartner = this.channels.find(i => i.id === id);

    if (retrievedContentPartner != undefined) {
      return Promise.resolve(retrievedContentPartner);
    } else {
      const error: BoclipsApiError = {
        error: 'Content partner not found',
        message: `No content partner found for this id: ${123}`,
        path: `/v1/content-partner/${id}`,
        timestamp: new Date(),
        status: 404,
      };
      return Promise.reject(error);
    }
  }

  public update(id: string, contentPartner: ChannelRequest) {
    const index = this.channels.findIndex(i => i.id === id);

    if (index < 0) {
      return Promise.reject();
    }

    const updatedFields: Partial<Channel> = {};

    Object.keys(contentPartner).forEach(key => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      updatedFields[key] = contentPartner[key];
    });

    this.channels[index] = {
      ...this.channels[index],
      ...updatedFields,
    };

    return Promise.resolve();
  }

  public clear() {
    this.channels = [];
  }

  public async getSignedLink(filename: string): Promise<string> {
    const newFilename = filename.replace('.', '_') + '_signed_link';
    const signedLinkUrl = `http://www.server.com/${newFilename}`;
    return new Promise(resolve => resolve(signedLinkUrl));
  }

  // private ageRange(ageRangeIds: string[]): AgeRange {
  //   const min = Math.min(...ageRangeIds.map(id => parseInt(id) || 5));
  //   const max = Math.min(...ageRangeIds.map(id => parseInt(id) || 19));
  //   return {
  //     min,
  //     max,
  //     ids: ageRangeIds,
  //     label: `${min}-${max}`,
  //   };
  // }
}
