import Pageable from '../common/model/Pageable';
import { PageableConverter } from '../common/model/PageableConverter';
import { PageableEntity } from '../common/model/PageableEntity';
import { Collection } from './model/Collection';
import { CollectionEntity } from './model/CollectionEntity';
import { convertLinks } from '../common/utils/convertLinks';
import { convertAttachment } from '../common/utils/convertAttachment';

export class CollectionsConverter {
  // can throw if attachment type is not valid
  // e.g. (not a member of enum AttachmentType)
  public static convert(entity: CollectionEntity): Collection {
    const links = convertLinks(entity);
    const attachments = entity.attachments
      ? entity.attachments.map(convertAttachment)
      : [];
    return {
      id: entity.id,
      owner: entity.owner,
      title: entity.title,
      videos: entity.videos,
      updatedAt: new Date(entity.updatedAt),
      public: entity.public,
      promoted: entity.promoted,
      mine: entity.mine,
      createdBy: entity.createdBy,
      subjects: entity.subjects,
      ageRange: entity.ageRange,
      description: entity.description,
      attachments,
      links: { ...links, self: links.self },
    };
  }

  public static convertPage(
    entity: PageableEntity<CollectionEntity>,
  ): Pageable<Collection> {
    return PageableConverter.convert(
      entity,
      'collections',
      CollectionsConverter.convert,
    );
  }
}
