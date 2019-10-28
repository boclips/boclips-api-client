import { CollectionEntityFactory } from '../../test-support/CollectionsFactory';
import { CollectionsConverter } from './CollectionsConverter';

describe('Collections converter', () => {
  it('can convert from entity', () => {
    const entity = CollectionEntityFactory.sample();
    const converted = CollectionsConverter.convert(entity);

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
  });
});
