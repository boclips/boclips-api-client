import { withClients } from '../../../pact-support/pactTestWrapper';
import { FakeBoclipsClient, isATestClient } from '../../../test-support';
import { ApiBoclipsClient } from '../../../ApiBoclipsClient';
import { provider } from '../../../pact-support/pactSetup';
import { Video } from '../model/Video';
import { getVideo, searchVideo, updateVideo } from '../pact/VideoInteractions';
import { Link } from '../../common/model/LinkEntity';
import { UpdateVideoRequest } from '../model/UpdateVideoRequest';
import { AttachmentFactory } from '../../../test-support/AttachmentsFactory';
import { AttachmentType } from '../../common/model/Attachment';
import moment = require('moment');
import { VideoSearchRequest } from '../model/VideoSearchRequest';
import Pageable from '../../common/model/Pageable';

export const existingVideoIdFromStaging = '5c92b2f4d0f34e48bbfb40d9';

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
        await provider.addInteraction(getVideo(existingVideoIdFromStaging));

        const video: Video = await client.videos.get(
          existingVideoIdFromStaging,
        );

        expect(video.id).toEqual(existingVideoIdFromStaging);
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

      it(`can update a video`, async () => {
        const updateVideoRequest: UpdateVideoRequest = {
          title:
            'England Beats West Indies in the Final Test (2029) Time Machine',
          description:
            'Subscribe: http://bit.ly/subscribetotheBFI.\nThe first West Indies Test cricket team flees England and loses all three matches.',
          promoted: false,
          subjectIds: ['5cb499c9fd5beb428189454d', '5e73821c9bbfd47e6e7533a4'],
          ageRangeMin: 3,
          ageRangeMax: 12,
          attachments: [
            {
              description: 'New attachment description',
              linkToResource: 'www.boclips.com',
              type: 'ACTIVITY',
            },
          ],
        };

        await provider.addInteraction(
          updateVideo(existingVideoIdFromStaging, updateVideoRequest),
        );

        const updatedVideo = await client.videos.update(
          existingVideoIdFromStaging,
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
      });

      it(`can get videos by a video filter`, async () => {
        const searchRequest: VideoSearchRequest = {
          // eslint-disable-next-line @typescript-eslint/camelcase
          content_partner: ['TED'],
          page: 0,
          size: 10,
        };

        await provider.addInteraction(searchVideo(searchRequest));
        if (isATestClient(client)) {
          client.videos.insertVideo({
            ...testVideo,
            id: 'video2',
            contentPartner: 'TED',
          });
        }

        const results: Pageable<Video> = await client.videos.search(
          searchRequest,
        );

        expect(results.pageSpec.number).toEqual(0);
        expect(results.pageSpec.size).toEqual(10);
        expect(results.page.length > 0).toBeTruthy();
      });
    },
  );
});

const testVideo: Video = {
  id: existingVideoIdFromStaging,
  title: 'Test Video',
  description: 'Test description',
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
  rating: null,
  yourRating: null,
  bestFor: [{ label: 'Context builder' }],
  createdBy: 'BFI',
  promoted: undefined,
  language: null,
  attachments: [AttachmentFactory.sample({ type: AttachmentType.ACTIVITY })],
  links: {
    self: new Link({ href: '/self' }),
    logInteraction: new Link({ href: '/logInteraction' }),
  },
};
