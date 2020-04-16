import { Collection } from '../sub-clients/collections/model/Collection';
import { CollectionEntity } from '../sub-clients/collections/model/CollectionEntity';
import CollectionFilter from '../sub-clients/collections/model/CollectionFilter';
import { Link } from '../sub-clients/common/model/LinkEntity';
import { PageableEntity } from '../sub-clients/common/model/PageableEntity';

export class CollectionEntityFactory {
  public static sample(
    collection: Partial<CollectionEntity>,
  ): CollectionEntity {
    const id = '123';
    const defaults = {
      id,
      owner: 'owner-id',
      title: 'My Videos edited',
      videos: [],
      updatedAt: '2019-10-21T09:11:19.074Z',
      public: false,
      promoted: false,
      mine: false,
      createdBy: 'Teacher',
      subjects: [],
      ageRange: null,
      description: null,
      attachments: [],
      _links: {
        self: {
          href: `/v1/collections/${id}`,
        },
        edit: {
          href: `/v1/collections/${id}/edit`,
        },
        bookmark: {
          href: `/v1/collections/${id}/bookmark`,
        },
      },
    };
    return {
      ...defaults,
      ...collection,
    };
  }
}

export const getFilteredCollectionsQuery = (
  filters: CollectionFilter,
  projection: string,
) => {
  const { query, page, size } = filters;
  return `${
    query ? `query=${query}&` : ''
  }projection=${projection}&page=${page}&size=${size}`;
};

export class PageableCollectionsEntityFactory {
  public static sample(
    filters: CollectionFilter = { page: 0, size: 25, projection: 'details' },
    collections: CollectionEntity[] = [],
  ): PageableEntity<CollectionEntity> {
    const { page, size, projection } = filters;
    return {
      page: {
        number: page,
        size,
        totalElements: collections.length,
        totalPages: Math.floor(collections.length / size),
      },
      _embedded: { collections },
      _links: {
        details: {
          href: `/v1/collections?${getFilteredCollectionsQuery(
            filters,
            'details',
          )}`,
        },
        list: {
          href: `/v1/collections?${getFilteredCollectionsQuery(
            filters,
            'list',
          )}`,
        },
        next: {
          href: `/v1/collections?${getFilteredCollectionsQuery(
            filters,
            projection,
          )}`,
        },
        self: {
          href: `/v1/collections?${getFilteredCollectionsQuery(
            filters,
            projection,
          )}`,
        },
      },
    };
  }
}

export class CollectionFactory {
  public static sampleFromId = (
    collection: Pick<Collection, 'id'> = { id: '123' },
  ): Collection => {
    const id = collection.id;
    return {
      ...CollectionFactory.defaultFields(),
      id,
      links: {
        self: new Link({
          href: `/v1/collections/${id}`,
        }),
      },
    };
  };

  public static sample = (collection: Partial<Collection>): Collection => ({
    ...CollectionFactory.defaultFields(),
    ...collection,
  });

  private static defaultFields(): Collection {
    const id = '123';
    return {
      id,
      owner: 'owner-id',
      title: 'My Videos edited',
      videos: [],
      updatedAt: new Date('2019-10-21T09:11:19.074Z'),
      public: false,
      mine: false,
      createdBy: 'Teacher',
      subjects: [],
      ageRange: undefined,
      description: undefined,
      attachments: [],
      links: {
        self: new Link({
          href: `/v1/collections/${id}`,
        }),
      },
    };
  }
}
