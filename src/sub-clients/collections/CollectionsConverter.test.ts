import {
  CollectionEntityFactory,
  PageableCollectionsEntityFactory,
} from '../../test-support/CollectionsFactory';
import { CollectionsConverter } from './CollectionsConverter';
import { Collection } from './model/Collection';
import { CollectionEntity } from './model/CollectionEntity';

describe('Collections converter', () => {
  it('can convert from collection', () => {
    const entity = CollectionEntityFactory.sample();
    const converted = CollectionsConverter.convert(entity);

    assertConvertedCollection(converted, entity);
  });

  it('can convert multiple paged collections', () => {
    const firstCollectionEntity = CollectionEntityFactory.sample({
      id: 'first',
    });
    const secondCollectionEntity = CollectionEntityFactory.sample({
      id: 'second',
    });

    const entity = PageableCollectionsEntityFactory.sample(undefined, [
      firstCollectionEntity,
      secondCollectionEntity,
    ]);

    const converted = CollectionsConverter.convertAll(entity);

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
    expect(converted.mine).toEqual(entity.mine);
    expect(converted.createdBy).toEqual(entity.createdBy);
    expect(converted.subjects.length).toEqual(entity.subjects.length);
    expect(converted.ageRange).toEqual(entity.ageRange);
    expect(converted.description).toEqual(entity.description);
    expect(converted.attachments.length).toEqual(entity.attachments.length);
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
