import { Video } from './Video';
import { VideosConverter } from './VideosConverter';
import { Link } from '../../common/model/LinkEntity';
import moment = require('moment');
import { VideoEntity } from './VideoEntity';
import { CaptionStatus } from './CaptionStatus';

describe('VideosConverter', () => {
  const baseVideoEntity: VideoEntity = {
    id: '5c92b2f4d0f34e48bbfb40d9',
    title: 'England Beats West Indies in the Final Test (2029) Time Machine',
    description:
      "Subscribe: http://bit.ly/subscribetotheBFI.\nThe first West Indies Test cricket team flees England and loses all three matches.\n\nThe first West Indies Test TEAM visits England in this Topical Budget newsreel item. Cricketers from the West Indies had toured England before and expectations of the tourists were high in the light of their impressive showing in 1923. Unfortunately, weak fielding led to the West Indies losing the third and final Test match at The Oval by an innings and seventy-nine runs.\n\nIn 1927 the West Indies were admitted to full membership of the Imperial Cricket Conference, joining England, Australia and South Africa. The 1928 Test tour was their first visit to England, and although the tourists lost each match by an innings, it marked the arrival of African Caribbean cricketers into the global game. Six black players appeared in the side including the celebrated all-rounder Learie Constantine and the emerging star George Headley. Learie Constantine went on to practice as a lawyer in Britain and was High Commissioner for Trinidad and Tobago in the United Kingdom, becoming Britain's first black peer in 1969 as Lord Constantine of Maraval and Nelson. (S.I. Martin)\n\nWatch more on the BFI Player: http://player.bfi.org.uk/\nFollow us on Twitter: https://twitter.com/BFI\nLike us on Facebook: https://www.facebook.com/BritishFilmInstitute\nFollow us on Google+: https://plus.google.com/+britishfilminstitute/\n\n\nThis is another paragraph\n\nthis is my website www.doc.com",
    releasedOn: '2019-03-20',
    playback: {
      type: 'STREAM',
      id: 'Fj5hU6SoCDA',
      duration: 'PT1M3S',
      maxResolutionAvailable: true,
      _links: {
        createPlaybackEvent: {
          href: 'https://api.boclips.com/v1/events/playback',
          templated: false,
        },
        createPlayerInteractedWithEvent: {
          href: 'https://api.boclips.com/v1/events/player-interaction',
          templated: false,
        },
        thumbnail: {
          href:
            'https://cdnapisec.kaltura.com/p/1776261/thumbnail/…0/width/{thumbnailWidth}/vid_slices/3/vid_slice/1',
          templated: true,
        },
        videoPreview: {
          href:
            'https://cdnapisec.kaltura.com/p/1776261/thumbnail/…idth/{thumbnailWidth}/vid_slices/{thumbnailCount}',
          templated: true,
        },
        hlsStream: {
          href:
            'https://cdnapisec.kaltura.com/p/1776261/sp/1776261…87091%2C487111%2C1049881/protocol/https/video.mp4',
          templated: false,
        },
      },
      downloadUrl: null,
    },
    subjects: [{ id: '5cb499c9fd5beb428189454d', name: 'History' }],
    badges: ['youtube'],
    legalRestrictions: '',
    ageRange: { min: 3, max: 8, label: '3-8' },
    rating: 4.8,
    yourRating: null,
    bestFor: [{ label: 'Context builder' }],
    createdBy: 'BFI',
    promoted: true,
    language: null,
    captionStatus: 'PROCESSING',
    types: [{ id: '1', name: 'INSTRUCTIONAL' }],
    attachments: [
      {
        id: 'attachment-id-123',
        type: 'ACTIVITY',
        description: 'Attachment description',
        _links: {
          download: {
            href: 'www.boclips.com',
            templated: false,
          },
        },
      },
    ],
    _links: {
      self: {
        href:
          'https://api.staging-boclips.com/v1/videos/5c92b2f4d0f34e48bbfb40d9',
        templated: false,
      },
      logInteraction: {
        href:
          'https://api.staging-boclips.com/v1/videos/5c92b2f4d0f34e48bbfb40d9/events?logVideoInteraction=true&type={type}',
        templated: true,
      },
      addAttachment: {
        href:
          'https://api.boclips.com/v1/videos/5c92b2f4d0f34e48bbfb40d9/attachments',
        templated: false,
      },
    },
  };

  it('converts a basic Video', () => {
    const video: Video = VideosConverter.convert(baseVideoEntity);

    expect(video.id).toEqual('5c92b2f4d0f34e48bbfb40d9');
    expect(video.title).toEqual(
      'England Beats West Indies in the Final Test (2029) Time Machine',
    );
    expect(video.description).toEqual(
      "Subscribe: http://bit.ly/subscribetotheBFI.\nThe first West Indies Test cricket team flees England and loses all three matches.\n\nThe first West Indies Test TEAM visits England in this Topical Budget newsreel item. Cricketers from the West Indies had toured England before and expectations of the tourists were high in the light of their impressive showing in 1923. Unfortunately, weak fielding led to the West Indies losing the third and final Test match at The Oval by an innings and seventy-nine runs.\n\nIn 1927 the West Indies were admitted to full membership of the Imperial Cricket Conference, joining England, Australia and South Africa. The 1928 Test tour was their first visit to England, and although the tourists lost each match by an innings, it marked the arrival of African Caribbean cricketers into the global game. Six black players appeared in the side including the celebrated all-rounder Learie Constantine and the emerging star George Headley. Learie Constantine went on to practice as a lawyer in Britain and was High Commissioner for Trinidad and Tobago in the United Kingdom, becoming Britain's first black peer in 1969 as Lord Constantine of Maraval and Nelson. (S.I. Martin)\n\nWatch more on the BFI Player: http://player.bfi.org.uk/\nFollow us on Twitter: https://twitter.com/BFI\nLike us on Facebook: https://www.facebook.com/BritishFilmInstitute\nFollow us on Google+: https://plus.google.com/+britishfilminstitute/\n\n\nThis is another paragraph\n\nthis is my website www.doc.com",
    );
    expect(video.releasedOn.toUTCString()).toEqual(
      'Wed, 20 Mar 2019 00:00:00 GMT',
    );
    expect(video.playback).toEqual({
      id: 'Fj5hU6SoCDA',
      type: 'STREAM',
      maxResolutionAvailable: true,
      duration: moment.duration('PT1M3S'),
      links: {
        createPlaybackEvent: new Link({
          href: 'https://api.boclips.com/v1/events/playback',
          templated: false,
        }),
        createPlayerInteractedWithEvent: new Link({
          href: 'https://api.boclips.com/v1/events/player-interaction',
          templated: false,
        }),
        thumbnail: new Link({
          href:
            'https://cdnapisec.kaltura.com/p/1776261/thumbnail/…0/width/{thumbnailWidth}/vid_slices/3/vid_slice/1',
          templated: true,
        }),
        videoPreview: new Link({
          href:
            'https://cdnapisec.kaltura.com/p/1776261/thumbnail/…idth/{thumbnailWidth}/vid_slices/{thumbnailCount}',
          templated: true,
        }),
        hlsStream: new Link({
          href:
            'https://cdnapisec.kaltura.com/p/1776261/sp/1776261…87091%2C487111%2C1049881/protocol/https/video.mp4',
          templated: false,
        }),
      },
    });
    expect(video.subjects).toEqual([
      { id: '5cb499c9fd5beb428189454d', name: 'History' },
    ]);
    expect(video.badges).toEqual(['youtube']);
    expect(video.legalRestrictions).toEqual('');
    expect(video.ageRange).toEqual({ min: 3, max: 8, label: '3-8' });
    expect(video.rating).toEqual(4.8);
    expect(video.yourRating).toEqual(null);
    expect(video.bestFor).toEqual([{ label: 'Context builder' }]);
    expect(video.createdBy).toEqual('BFI');
    expect(video.promoted).toEqual(true);
    expect(video.language).toEqual(null);

    expect(video.attachments.length).toEqual(1);
    expect(video.attachments[0].id).toEqual('attachment-id-123');
    expect(video.attachments[0].type).toEqual('ACTIVITY');
    expect(video.attachments[0].description).toEqual('Attachment description');
    expect(video.attachments[0].linkToResource).toEqual('www.boclips.com');
    expect(video.attachments[0].links).toEqual({
      download: {
        link: {
          href: 'www.boclips.com',
          templated: false,
        },
      },
    });

    expect(video.links.self.getOriginalLink()).toEqual(
      'https://api.staging-boclips.com/v1/videos/5c92b2f4d0f34e48bbfb40d9',
    );
    expect(video.links.logInteraction.getOriginalLink()).toEqual(
      'https://api.staging-boclips.com/v1/videos/5c92b2f4d0f34e48bbfb40d9/events?logVideoInteraction=true&type={type}',
    );
    expect(video.links.addAttachment?.getOriginalLink()).toEqual(
      'https://api.boclips.com/v1/videos/5c92b2f4d0f34e48bbfb40d9/attachments',
    );
    expect(video.captionStatus).toEqual(CaptionStatus.PROCESSING);
  });

  it('converts a Video with Boclips projection', () => {
    const entityWithBoclipsProjection = {
      ...baseVideoEntity,
      channel: 'TED-Ed',
      channelId: '5cf141cbc1475c47f717870d',
      channelVideoId: '1805_08_A',
      types: [
        {
          id: 3,
          name: 'Instructional Clips',
        },
      ],
    };

    const video = VideosConverter.convert(entityWithBoclipsProjection);

    expect(video.channel).toEqual('TED-Ed');
    expect(video.channelId).toEqual('5cf141cbc1475c47f717870d');
    expect(video.channelVideoId).toEqual('1805_08_A');
    expect(video.types!![0].id).toEqual(3);
    expect(video.types!![0].name).toEqual('Instructional Clips');
  });
});
