import { Video } from './Video';
import { VideosConverter } from './VideosConverter';
import { hasBoclipsProjection } from '../utils/hasBoclipsProjection';

describe('VideosConverter', () => {
  const baseVideoEntity = {
    id: '5c92b2f4d0f34e48bbfb40d9',
    title: 'England Beats West Indies in the Final Test (2029) Time Machine',
    description:
      "Subscribe: http://bit.ly/subscribetotheBFI.\nThe first West Indies Test cricket team flees England and loses all three matches.\n\nThe first West Indies Test TEAM visits England in this Topical Budget newsreel item. Cricketers from the West Indies had toured England before and expectations of the tourists were high in the light of their impressive showing in 1923. Unfortunately, weak fielding led to the West Indies losing the third and final Test match at The Oval by an innings and seventy-nine runs.\n\nIn 1927 the West Indies were admitted to full membership of the Imperial Cricket Conference, joining England, Australia and South Africa. The 1928 Test tour was their first visit to England, and although the tourists lost each match by an innings, it marked the arrival of African Caribbean cricketers into the global game. Six black players appeared in the side including the celebrated all-rounder Learie Constantine and the emerging star George Headley. Learie Constantine went on to practice as a lawyer in Britain and was High Commissioner for Trinidad and Tobago in the United Kingdom, becoming Britain's first black peer in 1969 as Lord Constantine of Maraval and Nelson. (S.I. Martin)\n\nWatch more on the BFI Player: http://player.bfi.org.uk/\nFollow us on Twitter: https://twitter.com/BFI\nLike us on Facebook: https://www.facebook.com/BritishFilmInstitute\nFollow us on Google+: https://plus.google.com/+britishfilminstitute/\n\n\nThis is another paragraph\n\nthis is my website www.doc.com",
    releasedOn: '2019-03-20',
    playback: {
      type: 'YOUTUBE',
      id: 'Fj5hU6SoCDA',
      duration: 'PT1M3S',
      _links: {
        createPlaybackEvent: {
          href: 'https://api.staging-boclips.com/v1/events/playback',
          templated: false,
        },
        createPlayerInteractedWithEvent: {
          href: 'https://api.staging-boclips.com/v1/events/player-interaction',
          templated: false,
        },
        thumbnail: {
          href: 'https://i.ytimg.com/vi/Fj5hU6SoCDA/hqdefault.jpg',
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
    expect(video.playback).toEqual({ type: 'YOUTUBE' });
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
    expect(video.links.self.getOriginalLink()).toEqual(
      'https://api.staging-boclips.com/v1/videos/5c92b2f4d0f34e48bbfb40d9',
    );
    expect(video.links.logInteraction.getOriginalLink()).toEqual(
      'https://api.staging-boclips.com/v1/videos/5c92b2f4d0f34e48bbfb40d9/events?logVideoInteraction=true&type={type}',
    );
  });
  it('converts a Video with Boclips projection', () => {
    const entityWithBoclipsProjection = {
      ...baseVideoEntity,
      contentPartner: 'TED-Ed',
      contentPartnerId: '5cf141cbc1475c47f717870d',
      contentPartnerVideoId: '1805_08_A',
      type: {
        id: 3,
        name: 'Instructional Clips',
      },
    };

    const video = VideosConverter.convert(entityWithBoclipsProjection);

    if (hasBoclipsProjection(video)) {
      expect(video.contentPartner).toEqual('TED-Ed');
    } else {
      fail('Video type should be VideoWithBoclipsProjection');
    }
  });
});
