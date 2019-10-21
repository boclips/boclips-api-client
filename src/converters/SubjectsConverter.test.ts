import { SubjectsConverter } from './SubjectsConverter';

describe('SubjectsConverter', () => {
  it('converts a subject resource to a Subject instance with update link', () => {
    const subject = SubjectsConverter.convert({
      id: '1',
      name: 'Fine Arts',
      _links: {
        update: {
          href: '/v1/subjects/1',
        },
      },
    });

    expect(subject).toEqual({
      id: '1',
      name: 'Fine Arts',
      updateLink: '/v1/subjects/1',
    });
  });

  it('converts a subject resource to a Subject instance without update link', () => {
    const subject = SubjectsConverter.convert({
      id: '1',
      name: 'Fine Arts',
      _links: {},
    });

    expect(subject).toEqual({
      id: '1',
      name: 'Fine Arts',
    });
  });
});
