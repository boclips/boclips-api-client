import {
  AttachmentEntityFactory,
  CollectionEntityFactory,
  PageableCollectionsEntityFactory,
} from '../../test-support/CollectionsFactory';
import { CollectionsConverter } from './CollectionsConverter';
import { AttachmentType, Collection } from './model/Collection';
import { CollectionEntity } from './model/CollectionEntity';

describe('Collections converter', () => {
  it('can convert from collection', () => {
    const entity = CollectionEntityFactory.sample({});
    const converted = CollectionsConverter.convert(entity);

    assertConvertedCollection(converted, entity);
  });

  it('throws Error if invalid attachment type is used', () => {
    const entity = CollectionEntityFactory.sample({
      attachments: [AttachmentEntityFactory.sample({ type: 'NOT_VALID' })],
    });

    expect(() => CollectionsConverter.convert(entity)).toThrow();
  });

  it('can convert multiple paged collections', () => {
    const firstCollectionEntity = CollectionEntityFactory.sample({
      id: 'first',
      attachments: [
        AttachmentEntityFactory.sample({
          id: 'first',
          description: 'description',
          type: AttachmentType.LESSON_PLAN,
          _links: { download: { href: 'firstLink' } },
        }),
      ],
    });

    const secondCollectionEntity = CollectionEntityFactory.sample({
      id: 'second',
      attachments: [
        AttachmentEntityFactory.sample({
          id: 'second',
          description: 'description 2',
          type: AttachmentType.LESSON_PLAN,
          _links: { download: { href: 'secondLink' } },
        }),
      ],
    });

    const entity = PageableCollectionsEntityFactory.sample(undefined, [
      firstCollectionEntity,
      secondCollectionEntity,
    ]);

    const converted = CollectionsConverter.convertPage(entity);

    expect(converted.page).toHaveLength(2);
    expect(converted.pageSpec.size).toEqual(25);
    expect(converted.pageSpec.totalElements).toEqual(2);
    expect(converted.pageSpec.totalPages).toEqual(0);

    assertConvertedCollection(converted.page[0], firstCollectionEntity);
    assertConvertedCollection(converted.page[1], secondCollectionEntity);
  });

  const assertConvertedCollection = (
    converted: Collection,
    entity: CollectionEntity,
  ) => {
    expect(converted.id).toEqual(entity.id);
    expect(converted.owner).toEqual(entity.owner);
    expect(converted.title).toEqual(entity.title);
    expect(converted.videos.length).toEqual(entity.videos.length);
    expect(converted.updatedAt).toEqual(new Date(entity.updatedAt));
    expect(converted.public).toEqual(entity.public);
    expect(converted.promoted).toEqual(entity.promoted);
    expect(converted.mine).toEqual(entity.mine);
    expect(converted.createdBy).toEqual(entity.createdBy);
    expect(converted.subjects.length).toEqual(entity.subjects.length);
    expect(converted.ageRange).toEqual(entity.ageRange);
    expect(converted.description).toEqual(entity.description);
    expect(converted.attachments.length).toEqual(entity.attachments.length);

    if (entity.attachments.length > 0) {
      const convertedAttachment = converted.attachments[0];
      const entityAttachment = entity.attachments[0];
      expect(convertedAttachment.type).toEqual(entityAttachment.type);
      expect(convertedAttachment.description).toEqual(
        entityAttachment.description,
      );
      expect(convertedAttachment.linkToResource).toEqual(
        entityAttachment._links.download.href,
      );
    }

    expect(converted.links.self.getOriginalLink()).toEqual(
      entity._links.self.href,
    );
    expect(converted.links.edit.getOriginalLink()).toEqual(
      entity._links.edit.href,
    );
    expect(converted.links.bookmark.getOriginalLink()).toEqual(
      entity._links.bookmark.href,
    );
  };
});
