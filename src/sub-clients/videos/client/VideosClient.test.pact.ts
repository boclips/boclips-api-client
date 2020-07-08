import { withClients } from '../../../pact-support/pactTestWrapper';
import { FakeBoclipsClient, isATestClient } from '../../../test-support';
import { ApiBoclipsClient } from '../../../ApiBoclipsClient';
import { provider } from '../../../pact-support/pactSetup';
import { Video } from '../model/Video';
import {
  deleteThumbnail,
  getCaptions,
  getVideo,
  searchVideo,
  setThumbnailBySecond,
  updateCaptions,
  updateVideo,
} from '../pact/VideoInteractions';
import { Link } from '../../common/model/LinkEntity';
import { UpdateVideoRequest } from '../model/UpdateVideoRequest';
import { AttachmentFactory } from '../../../test-support/AttachmentsFactory';
import { AttachmentType } from '../../common/model/Attachment';
import moment = require('moment');
import { VideoSearchRequest } from '../model/VideoSearchRequest';
import Pageable from '../../common/model/Pageable';
import { CaptionStatus } from '../model/CaptionStatus';
import { CaptionContent } from '../model/CaptionContent';
import { UpdateCaptionRequest } from '../model/UpdateCaptionRequest';

export const existingVideoWithAttachmentAndBestForFromStaging =
  '5c92b2f4d0f34e48bbfb40d9';
export const existingVideoWithoutAttachmentsAndBestFor =
  '5d2856277e173c570e69c459';
export const existingKalturaVideoFromStaging = '5c542ab85438cdbcb56ddceb';

describe('VideosClient', () => {
  withClients(
    (getClient: () => Promise<FakeBoclipsClient | ApiBoclipsClient>) => {
      let client: FakeBoclipsClient | ApiBoclipsClient;

      beforeEach(async () => {
        client = await getClient();

        if (isATestClient(client)) {
          client.videos.insertVideo(testVideo);
        }
      });

      it(`can fetch a video by id`, async () => {
        await provider.addInteraction(
          getVideo(existingVideoWithAttachmentAndBestForFromStaging),
        );

        const video: Video = await client.videos.get(
          existingVideoWithAttachmentAndBestForFromStaging,
        );

        expect(video.id).toEqual(
          existingVideoWithAttachmentAndBestForFromStaging,
        );
        expect(video.title).toEqual('Test Video');
        expect(video.description).toEqual('Test description');
        expect(video.releasedOn.toUTCString()).toEqual(
          'Mon, 03 Feb 2020 23:11:19 GMT',
        );
        expect(video.playback.id).toEqual('1_pxz2v8gx');
        expect(video.playback.type).toEqual('YOUTUBE');
        expect(video.playback.duration).toEqual(moment.duration('PT5M4S'));
        expect(video.playback.links.createPlayerInteractedWithEvent).toEqual(
          new Link({
            href: 'https://api.boclips.com/v1/events',
            templated: false,
          }),
        );
        expect(video.playback.links.thumbnail).toEqual(
          new Link({
            href: 'https://thumbnail',
            templated: false,
          }),
        );
        expect(video.subjects).toEqual([
          { id: '5cb499c9fd5beb428189454d', name: 'History' },
        ]);
        expect(video.badges).toEqual(['youtube']);
        expect(video.legalRestrictions).toEqual('');
        expect(video.bestFor).toEqual([{ label: 'Context builder' }]);
        expect(video.createdBy).toEqual('BFI');
        expect(video.attachments.length).toEqual(1);
        expect(video.attachments[0].type).toEqual('ACTIVITY');
        expect(video.links.self).toBeTruthy();
        expect(video.links.logInteraction).toBeTruthy();
      });

      it(`can fetch a video's caption content by ID`, async () => {
        await provider.addInteraction(
          getCaptions(existingKalturaVideoFromStaging),
        );

        if (isATestClient(client)) {
          client.videos.addCaptions(
            existingKalturaVideoFromStaging,
            'WEBVTT\n\n00:00:12.290 --> 00:00:16.090\nId like to talk today about the 2.\n00:00:16.090 --> 00:00:20.520\nBiggest social trends in the coming century and perhaps in',
          );
        }

        const captionContent: CaptionContent = await client.videos.getCaptions(
          existingKalturaVideoFromStaging,
        );
        expect(captionContent.content).toEqual(
          'WEBVTT\n\n00:00:12.290 --> 00:00:16.090\nId like to talk today about the 2.\n00:00:16.090 --> 00:00:20.520\nBiggest social trends in the coming century and perhaps in',
        );
      });

      it(`can update a video`, async () => {
        const updateVideoRequest: UpdateVideoRequest = {
          title:
            'England Beats West Indies in the Final Test (2029) Time Machine',
          description:
            'Subscribe: http://bit.ly/subscribetotheBFI.\nThe first West Indies Test cricket team flees England and loses all three matches.',
          promoted: false,
          subjectIds: ['5cb499c9fd5beb428189454d', '5e73821c9bbfd47e6e7533a4'],
          contentWarningIds: ['5ebeb463cb699d30b550e59b'],
          ageRangeMin: 3,
          ageRangeMax: 12,
          tagId: '5d3ac0185b3f3b7ba335e105',
          attachments: [
            {
              description: 'New attachment description',
              linkToResource: 'www.boclips.com',
              type: 'ACTIVITY',
            },
          ],
        };

        await provider.addInteraction(
          updateVideo(
            existingVideoWithAttachmentAndBestForFromStaging,
            updateVideoRequest,
          ),
        );

        const updatedVideo = await client.videos.update(
          existingVideoWithAttachmentAndBestForFromStaging,
          updateVideoRequest,
        );

        expect(updatedVideo.title).toEqual(
          'England Beats West Indies in the Final Test (2029) Time Machine',
        );
        expect(updatedVideo.description).toEqual(
          updateVideoRequest.description,
        );
        expect(updatedVideo.promoted).toEqual(false);
        expect(updatedVideo.subjects.length).toEqual(2);
        expect(updatedVideo.ageRange.min).toEqual(3);
        expect(updatedVideo.ageRange.max).toEqual(12);
        expect(updatedVideo.bestFor).toEqual([
          { label: 'tag-5d3ac0185b3f3b7ba335e105' },
        ]);
        expect(updatedVideo.contentWarnings!!.length).toEqual(1);
        expect(updatedVideo.contentWarnings!![0].id).toEqual(
          '5ebeb463cb699d30b550e59b',
        );
      });

      it(`can retrieve a video's captions`, async () => {
        await provider.addInteraction(
          getCaptions(existingKalturaVideoFromStaging),
        );

        if (isATestClient(client)) {
          client.videos.addCaptions(
            existingKalturaVideoFromStaging,
            'WEBVTT\n\n00:00:12.290 --> 00:00:16.090\nId like to talk today about the 2.\n00:00:16.090 --> 00:00:20.520\nBiggest social trends in the coming century and perhaps in',
          );
        }
        const results: CaptionContent = await client.videos.getCaptions(
          existingKalturaVideoFromStaging,
        );

        expect(results.content).toEqual(
          'WEBVTT\n\n00:00:12.290 --> 00:00:16.090\nId like to talk today about the 2.\n00:00:16.090 --> 00:00:20.520\nBiggest social trends in the coming century and perhaps in',
        );
      });

      it(`can update a video's captions`, async () => {
        const updateCaptionRequest: UpdateCaptionRequest = {
          captions:
            'WEBVTT\n\n00:00:12.290 --> 00:00:16.090\nId like to talk today about the 2.\n00:00:16.090 --> 00:00:20.520\nBiggest social trends in the coming century and perhaps in',
        };
        await provider.addInteraction(
          updateCaptions(existingKalturaVideoFromStaging, updateCaptionRequest),
        );

        await provider.addInteraction(
          getCaptions(existingKalturaVideoFromStaging),
        );

        if (isATestClient(client)) {
          client.videos.addCaptions(
            existingKalturaVideoFromStaging,
            'some caption content',
          );
        }
        await client.videos.updateCaptions(
          existingKalturaVideoFromStaging,
          updateCaptionRequest,
        );
        const results: CaptionContent = await client.videos.getCaptions(
          existingKalturaVideoFromStaging,
        );

        expect(results.content).toEqual(
          'WEBVTT\n\n00:00:12.290 --> 00:00:16.090\nId like to talk today about the 2.\n00:00:16.090 --> 00:00:20.520\nBiggest social trends in the coming century and perhaps in',
        );
      });

      it(`can search videos by content partner`, async () => {
        const searchRequest: VideoSearchRequest = {
          channel: ['TED'],
          page: 0,
          size: 10,
        };

        await provider.addInteraction(
          searchVideo(searchRequest, 'filtering by channel'),
        );
        if (isATestClient(client)) {
          client.videos.insertVideo({
            ...testVideo,
            id: 'video2',
            channel: 'TED',
          });
        }

        const results: Pageable<Video> = await client.videos.search(
          searchRequest,
        );

        expect(results.pageSpec.number).toEqual(0);
        expect(results.pageSpec.size).toEqual(10);
        expect(results.page.length > 0).toBeTruthy();
      });

      it(`can search videos by video ids`, async () => {
        const searchRequest: VideoSearchRequest = {
          // eslint-disable-next-line @typescript-eslint/camelcase
          id: [existingVideoWithoutAttachmentsAndBestFor],
          page: 0,
          size: 10,
        };

        await provider.addInteraction(
          searchVideo(searchRequest, 'filtering by video ids'),
        );
        if (isATestClient(client)) {
          client.videos.insertVideo({
            ...testVideo,
            id: existingVideoWithoutAttachmentsAndBestFor,
          });
        }

        const results: Pageable<Video> = await client.videos.search(
          searchRequest,
        );

        expect(results.pageSpec.number).toEqual(0);
        expect(results.pageSpec.size).toEqual(10);
        expect(results.page.length > 0).toBeTruthy();
      });

      it(`can set up video thumbnail by second`, async () => {
        const video: Video = {
          ...testVideo,
          id: existingKalturaVideoFromStaging,
        };

        video.playback.links.setThumbnailBySecond = new Link({
          href: `${provider.mockService.baseUrl}/v1/videos/${video.id}/playback{?thumbnailSecond}`,
          templated: true,
        });

        await provider.addInteraction(setThumbnailBySecond(video.id, 20));

        if (isATestClient(client)) {
          client.videos.insertVideo(video);
        }

        const updatedVideo = await client.videos.setThumbnailBySecond(
          video,
          20,
        );
        expect(updatedVideo.playback.links.deleteThumbnail).not.toBeUndefined();
        expect(
          updatedVideo.playback.links.setThumbnailBySecond,
        ).toBeUndefined();
        expect(updatedVideo.playback.links.setCustomThumbnail).toBeUndefined();
      });

      it(`can delete video thumbnail`, async () => {
        const video: Video = {
          ...testVideo,
          id: existingKalturaVideoFromStaging,
        };

        video.playback.links.deleteThumbnail = new Link({
          href: `${provider.mockService.baseUrl}/v1/videos/${video.id}/playback/thumbnail`,
          templated: false,
        });

        await provider.addInteraction(deleteThumbnail(video.id));

        if (isATestClient(client)) {
          client.videos.insertVideo(video);
        }

        const updatedVideo = await client.videos.deleteThumbnail(video);
        expect(updatedVideo.playback.links.deleteThumbnail).toBeUndefined();
        expect(
          updatedVideo.playback.links.setThumbnailBySecond,
        ).not.toBeUndefined();
        expect(
          updatedVideo.playback.links.setCustomThumbnail,
        ).not.toBeUndefined();
      });
    },
  );
});

const testVideo: Video = {
  id: existingVideoWithAttachmentAndBestForFromStaging,
  title: 'Test Video',
  description: 'Test description',
  additionalDescription: undefined,
  releasedOn: new Date('2020-02-03T23:11:19.074Z'),
  playback: {
    type: 'YOUTUBE',
    id: '1_pxz2v8gx',
    duration: moment.duration('PT5M4S'),
    links: {
      createPlayerInteractedWithEvent: new Link({
        href: 'https://api.boclips.com/v1/events',
        templated: false,
      }),
      thumbnail: new Link({
        href: 'https://thumbnail',
        templated: false,
      }),
    },
  },
  subjects: [{ id: '5cb499c9fd5beb428189454d', name: 'History' }],
  badges: ['youtube'],
  legalRestrictions: '',
  ageRange: { min: 11, max: 18, label: '11-18' },
  rating: undefined,
  yourRating: undefined,
  bestFor: [{ label: 'Context builder' }],
  createdBy: 'BFI',
  promoted: false,
  language: { code: 'en-US', displayName: 'English (US)' },
  attachments: [AttachmentFactory.sample({ type: AttachmentType.ACTIVITY })],
  captionStatus: CaptionStatus.PROCESSING,
  links: {
    self: new Link({ href: '/self' }),
    logInteraction: new Link({ href: '/logInteraction' }),
  },
};
