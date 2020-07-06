import { Playback } from './Playback';
import { PlaybackConverter } from './PlaybackConverter';
import { Link } from './LinkEntity';
import moment = require('moment');

describe('PlaybackConverter', () => {
  it('converts', () => {
    const entity = {
      type: 'STREAM',
      id: 'Fj5hU6SoCDA',
      duration: 'PT1M3S',
      _links: {
        createPlaybackEvent: {
          href: 'https://playback',
          templated: false,
        },
        createPlayerInteractedWithEvent: {
          href: 'https://player-interaction',
          templated: false,
        },
        thumbnail: {
          href: 'https://thumbnail',
          templated: true,
        },
        setThumbnailBySecond: {
          href: 'https://setThumbnailBySecond',
          templated: true,
        },
        deleteThumbnail: {
          href: 'https://deleteThumbnail',
          templated: false,
        },
        videoPreview: {
          href: 'https://videoPreview',
          templated: true,
        },
        hlsStream: {
          href: 'https://hlsStream',
          templated: false,
        },
        download: {
          href: 'https://download',
          templated: false,
        },
      },
      downloadUrl: null,
    };

    const playback: Playback = PlaybackConverter.convert(entity);

    expect(playback.id).toEqual('Fj5hU6SoCDA');
    expect(playback.type).toEqual('STREAM');
    expect(playback.duration).toEqual(moment.duration('PT1M3S'));
    expect(playback.links).toEqual({
      createPlaybackEvent: link('https://playback'),
      createPlayerInteractedWithEvent: link('https://player-interaction'),
      thumbnail: link('https://thumbnail', true),
      setThumbnailBySecond: link('https://setThumbnailBySecond', true),
      deleteThumbnail: link('https://deleteThumbnail', false),
      videoPreview: link('https://videoPreview', true),
      hlsStream: link('https://hlsStream'),
      download: link('https://download'),
    });
  });

  const link = (href: string, templated: boolean = false) =>
    new Link({ href, templated });
});
