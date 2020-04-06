import { InteractionObject } from '@pact-foundation/pact';
import { like } from '@pact-foundation/pact/dsl/matchers';
import { UpdateVideoRequest } from '../model/UpdateVideoRequest';

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
      subjects: like([{ id: '5cb499c9fd5beb428189454d', name: 'History' }]),
      badges: like(['youtube']),
      legalRestrictions: like(''),
      bestFor: [{ label: 'Context builder' }],
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
  const interactionObject: InteractionObject = {
    state: undefined,
    uponReceiving: 'PATCH video',
    withRequest: {
      method: 'PATCH',
      path: `/v1/videos/${id}`,
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
        subjects: like([{ id: '5cb499c9fd5beb428189454d', name: 'History' }]),
        badges: like(['youtube']),
        legalRestrictions: like(''),
        bestFor: [{ label: 'Context builder' }],
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
