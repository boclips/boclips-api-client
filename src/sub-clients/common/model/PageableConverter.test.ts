import { PageableConverter } from './PageableConverter';
import { PageableEntity } from './PageableEntity';

interface TestElementEntity {
  id: number;
  name: string;
}

interface TestElement {
  id: number;
  name: string;
  converted: boolean;
}

const testElementConverter = (entity: TestElementEntity): TestElement => {
  return { ...entity, converted: true };
};

describe('PageableConverter', () => {
  it('converts the last page, without next link', () => {
    const entity: PageableEntity<TestElementEntity> = {
      page: {
        number: 0,
        size: 1,
        totalElements: 1,
        totalPages: 1,
      },
      _embedded: {
        test: [{ id: 1, name: 'Test Element One' }],
      },
    };

    const convertedPageable = PageableConverter.convert<
      TestElementEntity,
      TestElement
    >(entity, 'test', testElementConverter);

    expect(convertedPageable.pageSpec.number).toEqual(0);
    expect(convertedPageable.pageSpec.size).toEqual(1);
    expect(convertedPageable.pageSpec.totalElements).toEqual(1);
    expect(convertedPageable.pageSpec.totalPages).toEqual(1);
    expect(convertedPageable.pageSpec.nextPage).toBeUndefined();
    expect(convertedPageable.pageSpec.previousPage).toBeUndefined();

    expect(convertedPageable.page[0].id).toEqual(1);
    expect(convertedPageable.page[0].name).toEqual('Test Element One');
    expect(convertedPageable.page[0].converted).toEqual(true);
  });

  it('converts the first page, with next link', () => {
    const entity: PageableEntity<TestElementEntity> = {
      page: {
        number: 0,
        size: 1,
        totalElements: 2,
        totalPages: 2,
      },
      _embedded: {
        test: [{ id: 1, name: 'Test Element One' }],
      },
      _links: {
        next: {
          href: 'www.next.com',
          templated: true,
        },
      },
    };

    const convertedPageable = PageableConverter.convert<
      TestElementEntity,
      TestElement
    >(entity, 'test', testElementConverter);

    expect(convertedPageable.pageSpec.number).toEqual(0);
    expect(convertedPageable.pageSpec.size).toEqual(1);
    expect(convertedPageable.pageSpec.totalElements).toEqual(2);
    expect(convertedPageable.pageSpec.totalPages).toEqual(2);
    expect(convertedPageable.pageSpec.nextPage?.getOriginalLink()).toEqual(
      'www.next.com',
    );
    expect(convertedPageable.pageSpec.previousPage).toBeUndefined();

    expect(convertedPageable.page[0].id).toEqual(1);
  });

  it('converts the last page, with previous link', () => {
    const entity: PageableEntity<TestElementEntity> = {
      page: {
        number: 1,
        size: 1,
        totalElements: 2,
        totalPages: 2,
      },
      _embedded: {
        test: [{ id: 2, name: 'Test Element Two' }],
      },
      _links: {
        prev: {
          href: 'www.prev.com',
          templated: true,
        },
      },
    };

    const convertedPageable = PageableConverter.convert<
      TestElementEntity,
      TestElement
    >(entity, 'test', testElementConverter);

    expect(convertedPageable.pageSpec.number).toEqual(1);
    expect(convertedPageable.pageSpec.size).toEqual(1);
    expect(convertedPageable.pageSpec.totalElements).toEqual(2);
    expect(convertedPageable.pageSpec.totalPages).toEqual(2);
    expect(convertedPageable.pageSpec.nextPage).toBeUndefined();
    expect(convertedPageable.pageSpec.previousPage?.getOriginalLink()).toEqual(
      'www.prev.com',
    );

    expect(convertedPageable.page[0].id).toEqual(2);
  });
});
