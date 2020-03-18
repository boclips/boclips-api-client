import { UserConverter } from './UserConverter';

describe('', () => {
  it('convert user entities to users', () => {
    const entity = {
      id: 'bla',
      firstName: 'blub',
      lastName: 'blub',
      email: 'blipidy',
    };

    const users = UserConverter.convert({
      _embedded: {
        users: [entity],
      },
    });

    expect(users[0]).toEqual({
      id: 'bla',
      firstName: 'blub',
      lastName: 'blub',
      email: 'blipidy',
    });
  });
});
