import { InteractionObject } from '@pact-foundation/pact';
import { eachLike, like } from '@pact-foundation/pact/dsl/matchers';
import { UpdateVideoRequest } from '../model/UpdateVideoRequest';
import { Link } from '../../common/model/LinkEntity';
import { VideoSearchRequest } from '../model/VideoSearchRequest';
import { VIDEO_SEARCH_URL } from '../../adminLinks/pact/AdminLinksInteractions';

export const getVideo = (id: string): InteractionObject => ({
  state: undefined,
  uponReceiving: 'GET video',
  withRequest: {
    method: 'GET',
    path: `/v1/videos/${id}`,
  },
  willRespondWith: {
    status: 200,
    headers: {
      'Content-Type': 'application/hal+json;charset=UTF-8',
    },
    body: {
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
});

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
        'Content-Type': 'application/hal+json;charset=UTF-8',
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
        'Content-Type': 'application/hal+json;charset=UTF-8',
      },
      body: {
        page: {
          number: like(searchRequest.page),
          size: like(searchRequest.size),
          totalElements: like(1),
          totalPages: like(0),
        },
        _embedded: like({
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
            bestFor: eachLike({ label: 'blue' }),
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
