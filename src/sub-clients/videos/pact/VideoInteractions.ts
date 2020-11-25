import { InteractionObject, Matchers } from '@pact-foundation/pact';
import { eachLike, like } from '@pact-foundation/pact/dsl/matchers';
import { UpdateVideoRequest } from '../model/UpdateVideoRequest';
import { Link } from '../../common/model/LinkEntity';
import { VideoSearchRequest } from '../model/VideoSearchRequest';
import { VIDEO_SEARCH_URL } from '../../adminLinks/pact/AdminLinksInteractions';
import { UpdateCaptionRequest } from '../model/UpdateCaptionRequest';
import contentTypeRegex from '../../../test-support/HalJsonContentTypeRegex';

export const getVideo = (
  id: string,
  shareCode: string,
  referer: string,
): InteractionObject => ({
  state: undefined,
  uponReceiving: 'GET video',
  withRequest: {
    method: 'GET',
    path: `/v1/videos/${id}`,
    query: `referer=${referer}&shareCode=${shareCode}`,
  },
  willRespondWith: {
    status: 200,
    headers: {
      'Content-Type': Matchers.term({
        generate: 'application/hal+json;charset=UTF-8',
        matcher: contentTypeRegex,
      }),
    },
    body: sampleVideoResponse(id),
  },
});

export const getCaptions = (id: string): InteractionObject => ({
  state: undefined,
  uponReceiving: 'GET captions',
  withRequest: {
    method: 'GET',
    path: `/v1/videos/${id}/captions`,
  },
  willRespondWith: {
    status: 200,
    headers: {
      'Content-Type': Matchers.term({
        generate: 'application/hal+json;charset=UTF-8',
        matcher: contentTypeRegex,
      }),
    },
    body: {
      content: like(
        'WEBVTT\n\n00:00:12.290 --> 00:00:16.090\nId like to talk today about the 2.\n00:00:16.090 --> 00:00:20.520\nBiggest social trends in the coming century and perhaps in',
      ),
    },
  },
});

export const updateCaptions = (
  id: string,
  updateCaptionRequest: UpdateCaptionRequest,
): InteractionObject => ({
  state: undefined,
  uponReceiving: 'PUT captions',
  withRequest: {
    method: 'PUT',
    path: `/v1/videos/${id}/captions`,
    body: updateCaptionRequest,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  },
  willRespondWith: {
    status: 200,
  },
});

export const setThumbnailBySecond = (
  id: string,
  second: number,
): InteractionObject => {
  return {
    state: undefined,
    uponReceiving: 'PATCH thumbnail',
    withRequest: {
      method: 'PATCH',
      path: `/v1/videos/${id}/playback`,
      query: `thumbnailSecond=${second}`,
    },
    willRespondWith: {
      status: 200,
      body: {
        ...sampleVideoResponse(id),
        playback: like({
          _links: {
            thumbnail: { href: 'https://thumbnail', templated: true },
            deleteThumbnail: {
              href: 'https://deleteThumbnail',
              templated: true,
            },
          },
        }),
        bestFor: like([]),
        attachments: like([]),
      },
    },
  };
};

export const deleteThumbnail = (id: string): InteractionObject => {
  return {
    state: undefined,
    uponReceiving: 'DELETE thumbnail',
    withRequest: {
      method: 'DELETE',
      path: `/v1/videos/${id}/playback/thumbnail`,
    },
    willRespondWith: {
      status: 200,
      body: {
        ...sampleVideoResponse(id),
        playback: like({
          _links: {
            thumbnail: { href: 'https://thumbnail', templated: true },
            setThumbnailBySecond: {
              href: 'https://setThumbnailBySecond',
              templated: true,
            },
            setCustomThumbnail: {
              href: 'https://setCustomThumbnail',
              templated: true,
            },
          },
        }),
        bestFor: like([]),
        attachments: like([]),
      },
    },
  };
};

export const updateVideo = (
  id: string,
  updateVideoRequest: UpdateVideoRequest,
): InteractionObject => {
  const updateLink = new Link({
    href: `/v1/videos/${id}`,
    templated: true,
  }).getTemplatedLink(updateVideoRequest);

  const [path, query] = updateLink.split('?');

  const interactionObject: InteractionObject = {
    state: undefined,
    uponReceiving: 'PATCH video',
    withRequest: {
      method: 'PATCH',
      path,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      query,
      body: updateVideoRequest,
    },
    willRespondWith: {
      status: 200,
      headers: {
        'Content-Type': Matchers.term({
          generate: 'application/hal+json;charset=UTF-8',
          matcher: contentTypeRegex,
        }),
      },
      body: {
        id: like(id),
        title: like(
          updateVideoRequest.title ? updateVideoRequest.title : 'Test Video',
        ),
        description: like(
          updateVideoRequest.description
            ? updateVideoRequest.description
            : 'Test description',
        ),
        releasedOn: like(new Date('2020-02-03T23:11:19.074Z').toUTCString()),
        playback: like({
          type: 'YOUTUBE',
          id: '1_pxz2v8gx',
          duration: 'PT5M4S',
          _links: {
            createPlayerInteractedWithEvent: {
              href: 'https://api.boclips.com/v1/events',
              templated: false,
            },
            thumbnail: { href: 'https://thumbnail', templated: false },
          },
        }),
        ageRange: like({
          min: updateVideoRequest.ageRangeMin,
          max: updateVideoRequest.ageRangeMax,
        }),
        subjects: like([
          {
            id: updateVideoRequest.subjectIds?.[0],
            name: `History`,
          },
          {
            id: updateVideoRequest.subjectIds?.[1],
            name: `Ancient History`,
          },
        ]),
        badges: like(['youtube']),
        legalRestrictions: like(''),
        bestFor: like([{ label: `tag-${updateVideoRequest.tagId}` }]),
        attachments: like([
          like({
            id: '5e963dc0bc854e03b4f0fa6b',
            type: 'ACTIVITY',
            description: 'New attachment description',
            _links: {
              download: { href: 'www.boclips.com', templated: false },
            },
          }),
        ]),
        contentWarnings: eachLike({
          id: '5ebeb463cb699d30b550e59b',
          label: 'Discusses drug or alcohol use',
        }),
        createdBy: 'BFI',
        _links: like({
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
        }),
      },
    },
  };
  if (updateVideoRequest.promoted !== undefined) {
    interactionObject.willRespondWith.body = {
      ...interactionObject.willRespondWith.body,
      promoted: like(updateVideoRequest.promoted),
    };
  }

  return interactionObject;
};

export const searchVideo = (
  searchRequest: VideoSearchRequest,
  state: string,
): InteractionObject => {
  const link = new Link({
    href: `${VIDEO_SEARCH_URL}`,
    templated: true,
  }).getTemplatedLink(searchRequest);

  const [path, query] = link.split('?');

  return {
    state: state,
    uponReceiving: 'GET search video',
    withRequest: {
      method: 'GET',
      path,
      query,
    },
    willRespondWith: {
      status: 200,
      headers: {
        'Content-Type': Matchers.term({
          generate: 'application/hal+json;charset=UTF-8',
          matcher: contentTypeRegex,
        }),
      },
      body: {
        page: {
          number: like(searchRequest.page),
          size: like(searchRequest.size),
          totalElements: like(1),
          totalPages: like(0),
        },
        _embedded: like({
          facets: like({
            subjects: {
              '5cb499c9fd5beb428189454c': {
                hits: 1,
                id: '5cb499c9fd5beb428189454c',
                name: 'subject name',
              },
            },
            ageRanges: {},
            durations: {
              'PT2M-PT5M': { hits: 1, id: null },
              'PT20M-PT24H': { hits: 0, id: null },
            },
            videoTypes: { instructional: { hits: 1 } },
            resourceTypes: {},
            channels: {},
          }),
          videos: eachLike({
            id: like('id'),
            title: like('Test Video'),
            description: like('Test description'),
            releasedOn: like(
              new Date('2020-02-03T23:11:19.074Z').toUTCString(),
            ),
            playback: like({
              type: 'YOUTUBE',
              id: '1_pxz2v8gx',
              duration: 'PT5M4S',
              _links: {
                createPlayerInteractedWithEvent: {
                  href: 'https://api.boclips.com/v1/events',
                  templated: false,
                },
                thumbnail: { href: 'https://thumbnail', templated: false },
              },
            }),
            subjects: eachLike({
              id: '5cb499c9fd5beb428189454d',
              name: 'History',
            }),
            badges: like(['youtube']),
            legalRestrictions: like(''),
            attachments: like([]),
            createdBy: like('BFI'),
            _links: like({
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
            }),
          }),
        }),
      },
    },
  };
};

const sampleVideoResponse = (id: string) => ({
  id: like(id),
  title: like('Test Video'),
  description: like('Test description'),
  releasedOn: like(new Date('2020-02-03T23:11:19.074Z').toUTCString()),
  playback: like({
    type: 'YOUTUBE',
    id: '1_pxz2v8gx',
    duration: 'PT5M4S',
    _links: {
      createPlayerInteractedWithEvent: {
        href: 'https://api.boclips.com/v1/events',
        templated: false,
      },
      thumbnail: { href: 'https://thumbnail', templated: false },
    },
  }),
  subjects: eachLike({ id: '5cb499c9fd5beb428189454d', name: 'History' }),
  badges: like(['youtube']),
  types: eachLike({ id: 1, name: 'INSTRUCTIONAL' }),
  legalRestrictions: like(''),
  bestFor: like([{ label: 'Context builder' }]),
  attachments: like([
    like({
      id: '5e963dc0bc854e03b4f0fa6b',
      type: 'ACTIVITY',
      description: 'New attachment description',
      _links: {
        download: { href: 'www.boclips.com', templated: false },
      },
    }),
  ]),
  createdBy: like('BFI'),
  _links: like({
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
  }),
});
