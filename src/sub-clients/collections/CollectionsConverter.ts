import Pageable from '../common/model/Pageable';
import { PageableConverter } from '../common/model/PageableConverter';
import { PageableEntity } from '../common/model/PageableEntity';
import { Attachment, Collection, getAttachmentType } from './model/Collection';
import { AttachmentEntity, CollectionEntity } from './model/CollectionEntity';
import { convertLinks } from '../common/utils/convertLinks';

export class CollectionsConverter {
  // can throw if attachment type is not valid
  // e.g. (not a member of enum AttachmentType)
  public static convert(entity: CollectionEntity): Collection {
    const links = convertLinks(entity);
    const attachments = entity.attachments
      ? entity.attachments.map(CollectionsConverter.convertAttachment)
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

  public static convertAttachment = (entity: AttachmentEntity): Attachment => {
    const type = getAttachmentType(entity.type);
    if (!type) {
      throw Error(`${type} is not a valid attachment type`);
    }
    return {
      type,
      linkToResource: entity._links.download.href,
      description: entity.description,
    };
  };

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
