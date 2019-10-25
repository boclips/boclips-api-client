import { EntityWithLinks, Link } from '../types';
import { Collection, CollectionEntity } from './types';

export class CollectionsConverter {
  public static convert(entity: CollectionEntity): Collection {
    const links = this.convertLinks(entity);
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

  private static convertLinks<
    E extends EntityWithLinks,
    R extends { [rel in keyof E['_links']]: Link }
  >(entity: EntityWithLinks): R {
    // Use the links we received from the API
    const rels = Object.keys(entity._links);

    // Reduce the rels into a single object
    return rels.reduce((acc, rel) => {
      acc[rel] = new Link(entity._links[rel]);

      return acc;
    }, {}) as R;
  }
}
