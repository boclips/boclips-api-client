import { Collection } from '../clients/collections/model/Collection';
import { CollectionEntity } from '../clients/collections/model/CollectionEntity';
import { Link } from '../clients/common/model/LinkEntity';

export class CollectionEntityFactory {
  public static sample(
    collection: Pick<CollectionEntity, 'id'> = { id: '123' },
  ): CollectionEntity {
    const id = collection.id;
    return {
      id,
      owner: 'owner-id',
      title: 'My Videos edited',
      videos: [],
      updatedAt: '2019-10-21T09:11:19.074Z',
      public: false,
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
  }
}

export class CollectionFactory {
  public static sample(
    collection: Pick<Collection, 'id'> = { id: '123' },
  ): Collection {
    const id = collection.id;
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
      ageRange: null,
      description: null,
      attachments: [],
      links: {
        self: new Link({
          href: `/v1/collections/${id}`,
        }),
      },
    };
  }
}
