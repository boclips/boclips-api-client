import { Link } from '../common/model/LinkEntity';
import { SubjectsConverter } from './SubjectsConverter';

describe('SubjectsConverter', () => {
  it('converts a subject resource to a Subject instance with update link', () => {
    const subject = SubjectsConverter.convert({
      id: '1',
      name: 'Fine Arts',
      lessonPlan: false,
      _links: {
        update: {
          href: '/v1/subjects/1',
        },
      },
    });

    expect(subject).toEqual({
      id: '1',
      name: 'Fine Arts',
      lessonPlan: false,
      links: {
        update: new Link({ href: '/v1/subjects/1' }),
      },
    });
  });

  it('converts a subject resource to a Subject instance without update link', () => {
    const subject = SubjectsConverter.convert({
      id: '1',
      name: 'Fine Arts',
      lessonPlan: true,
      _links: {},
    });

    expect(subject).toEqual({
      id: '1',
      name: 'Fine Arts',
      lessonPlan: true,
      links: {},
    });
  });
});
