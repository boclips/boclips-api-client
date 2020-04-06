import { withClients } from '../../../pact-support/pactTestWrapper';
import { FakeBoclipsClient, isATestClient } from '../../../test-support';
import { ApiBoclipsClient } from '../../../ApiBoclipsClient';
import { provider } from '../../../pact-support/pactSetup';
import { Video } from '../model/Video';
import { getVideo, updateVideo } from '../pact/VideoInteractions';
import { Link } from '../../common/model/LinkEntity';
import moment = require('moment');
import { UpdateVideoRequest } from '../model/UpdateVideoRequest';

export const existingVideoIdFromStaging = '5c92b2f4d0f34e48bbfb40d9';

describe('VideosClient', () => {
  withClients(
    (getClient: () => Promise<FakeBoclipsClient | ApiBoclipsClient>) => {
      let client: FakeBoclipsClient | ApiBoclipsClient;

      beforeEach(async () => {
        client = await getClient();

        if (isATestClient(client)) {
          client.videosClient.insertVideo(testVideo);
        }
      });

      it(`can fetch a video by id`, async () => {
        await provider.addInteraction(getVideo(existingVideoIdFromStaging));

        const video: Video = await client.videosClient.get(
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
        expect(video.links.self).toBeTruthy();
        expect(video.links.logInteraction).toBeTruthy();
      });

      describe(`updating a video`, () => {
        it(`can change title, description and promoted`, async () => {
          const updateVideoRequest: UpdateVideoRequest = {
            title:
              'England Beats West Indies in the Final Test (2029) Time Machine',
            description:
              "Subscribe: http://bit.ly/subscribetotheBFI.\nThe first West Indies Test cricket team flees England and loses all three matches.\n\nThe first West Indies Test TEAM visits England in this Topical Budget newsreel item. Cricketers from the West Indies had toured England before and expectations of the tourists were high in the light of their impressive showing in 1923. Unfortunately, weak fielding led to the West Indies losing the third and final Test match at The Oval by an innings and seventy-nine runs.\n\nIn 1927 the West Indies were admitted to full membership of the Imperial Cricket Conference, joining England, Australia and South Africa. The 1928 Test tour was their first visit to England, and although the tourists lost each match by an innings, it marked the arrival of African Caribbean cricketers into the global game. Six black players appeared in the side including the celebrated all-rounder Learie Constantine and the emerging star George Headley. Learie Constantine went on to practice as a lawyer in Britain and was High Commissioner for Trinidad and Tobago in the United Kingdom, becoming Britain's first black peer in 1969 as Lord Constantine of Maraval and Nelson. (S.I. Martin)\n\nWatch more on the BFI Player: http://player.bfi.org.uk/\nFollow us on Twitter: https://twitter.com/BFI\nLike us on Facebook: https://www.facebook.com/BritishFilmInstitute\nFollow us on Google+: https://plus.google.com/+britishfilminstitute/\n\n\nThis is another paragraph\n\nthis is my website www.doc.com",
            promoted: true,
          };

          const videoToUpdate: Video = {
            ...testVideo,
            links: {
              ...testVideo.links,
              update: new Link({
                href: `${provider.mockService.baseUrl}/v1/videos/${existingVideoIdFromStaging}`,
              }),
            },
          };

          await provider.addInteraction(
            updateVideo(existingVideoIdFromStaging, updateVideoRequest),
          );

          const updatedVideo = await client.videosClient.update(
            videoToUpdate,
            updateVideoRequest,
          );

          expect(updatedVideo.title).toEqual(
            'England Beats West Indies in the Final Test (2029) Time Machine',
          );
          expect(updatedVideo.description).toEqual(
            updateVideoRequest.description,
          );
          expect(updatedVideo.promoted).toEqual(true);
        });
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
  links: {
    self: new Link({ href: '/self' }),
    logInteraction: new Link({ href: '/logInteraction' }),
  },
};
