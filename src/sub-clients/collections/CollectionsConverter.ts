import { EntityWithLinks } from '../common/model/common';
import { Link } from '../common/model/LinkEntity';
import Pageable from '../common/model/Pageable';
import { PageableEntity } from '../common/model/PageableEntity';
import { Collection } from './model/Collection';
import { CollectionEntity } from './model/CollectionEntity';

export class CollectionsConverter {
  public static convert(entity: CollectionEntity): Collection {
    const links = CollectionsConverter.convertLinks(entity);
    return {
      id: entity.id,
      owner: entity.owner,
      title: entity.title,
      videos: entity.videos,
      updatedAt: new Date(entity.updatedAt),
      public: entity.public,
      mine: entity.mine,
      createdBy: entity.createdBy,
      subjects: entity.subjects,
      ageRange: entity.ageRange,
      description: entity.description,
      attachments: entity.attachments,
      links: { ...links, self: links.self },
    };
  }

  public static convertAll(
    entity: PageableEntity<CollectionEntity>,
  ): Pageable<Collection> {
    const { number: pageNumber, size, totalElements, totalPages } = entity.page;

    return {
      pageSpec: {
        number: pageNumber,
        size,
        totalElements,
        totalPages,
      },
      page: entity._embedded.collections.map(CollectionsConverter.convert),
    };
  }

  private static convertLinks<
    E extends EntityWithLinks,
    R extends { [rel in keyof E['_links']]: Link }
  >(entity: E): R {
    // Use the links we received from the API
    const rels = Object.keys(entity._links);

    // Reduce the rels into a single object
    return rels.reduce((acc, rel) => {
      acc[rel] = new Link(entity._links[rel]);

      return acc;
    }, {}) as R;
  }
}
