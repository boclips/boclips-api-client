import { InteractionObject, Matchers } from '@pact-foundation/pact';
import { eachLike, term } from '@pact-foundation/pact/dsl/matchers';
import { CustomMatchers } from '../../../pact-support/matchers';
import { provider } from '../../../pact-support/pactSetup';
import { getFilteredCollectionsQuery } from '../../../test-support';
import CollectionFilter from '../model/CollectionFilter';
import {
  CreateCollectionRequest,
  UpdateCollectionRequest,
} from '../model/CollectionRequest';

const { like } = Matchers;

export const existingCollectionFromStaging = '5c55697a60fef77aa4af323f';

export const getCollectionById = (
  id: string = existingCollectionFromStaging,
): InteractionObject => ({
  state: undefined,
  uponReceiving: 'GET collection',
  withRequest: {
    method: 'GET',
    path: `/v1/collections/${id}`,
  },
  willRespondWith: {
    status: 200,
    headers: {
      'Content-Type': 'application/hal+json;charset=UTF-8',
    },
    body: {
      id: like(id),
      owner: like('owner-id'),
      title: like('My Videos edited'),
      updatedAt: term({
        generate: '2019-10-21T09:11:19.074Z',
        matcher: CustomMatchers.ISO8601_DATETIME_RELAXED,
      }),
      public: like(false),

      mine: like(false),
      createdBy: like('Teacher'),
      _links: like({
        self: {
          href: `${provider.mockService.baseUrl}/v1/collections/${id}`,
        },
      }),
    },
  },
});

export const getFilteredCollections = (
  filters: CollectionFilter,
): InteractionObject => {
  const { page, size, projection } = filters;
  return {
    state: undefined,
    uponReceiving: 'GET filtered collections',
    withRequest: {
      method: 'GET',
      path: `/v1/collections`,
      query: getFilteredCollectionsQuery(filters, projection),
    },
    willRespondWith: {
      status: 200,
      headers: {
        'Content-Type': 'application/hal+json;charset=UTF-8',
      },
      body: {
        page: {
          number: like(page),
          size: like(size),
          totalElements: like(1),
          totalPages: like(0),
        },
        _embedded: like({
          collections: eachLike({
            id: 'some-id',
            owner: 'owner-id',
            title: 'My Videos edited',
            updatedAt: term({
              generate: '2019-10-21T09:11:19.074Z',
              matcher: CustomMatchers.ISO8601_DATETIME_RELAXED,
            }),
            public: false,

            mine: false,
            createdBy: 'Teacher',
            _links: like({
              self: {
                href: `${provider.mockService.baseUrl}/v1/collections/some-id`,
              },
            }),
          }),
        }),
        _links: like({
          details: {
            href: `${
              provider.mockService.baseUrl
            }/v1/collections?${getFilteredCollectionsQuery(
              filters,
              'details',
            )}`,
          },
          list: {
            href: `${
              provider.mockService.baseUrl
            }/v1/collections?${getFilteredCollectionsQuery(filters, 'list')}`,
          },
          self: {
            href: `${
              provider.mockService.baseUrl
            }/v1/collections?${getFilteredCollectionsQuery(
              filters,
              projection,
            )}`,
          },
        }),
      },
    },
  };
};

export const createCollection = (
  request: CreateCollectionRequest,
  expectedId: string,
): InteractionObject => ({
  state: undefined,
  uponReceiving: 'POST collection',
  withRequest: {
    method: 'POST',
    path: `/v1/collections`,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: {
      title: request.title,
      description: request.description,
      videos: request.videos,
      public: request.public,
    },
  },
  willRespondWith: {
    status: 201,
    headers: {
      'Access-Control-Expose-Headers': like('location'),
      location: term({
        generate: `${provider.mockService.baseUrl}/v1/collections/${expectedId}`,
        matcher: `.*/v1/collections/.+`,
      }),
    },
  },
});

export const updateCollection = (
  id: string,
  updateCollectionRequest: UpdateCollectionRequest,
): InteractionObject => ({
  state: undefined,
  uponReceiving: 'PATCH collection',
  withRequest: {
    method: 'PATCH',
    path: `/v1/collections/${id}`,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: updateCollectionRequest,
  },
  willRespondWith: {
    status: 204,
  },
});
