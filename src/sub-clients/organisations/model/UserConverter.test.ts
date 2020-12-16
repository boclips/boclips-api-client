import { User } from './User';
import { UserConverter } from './UserConverter';
import { UserEntity } from './UserEntity';

describe('', () => {
  it('convert user entities to users', () => {
    const entity: UserEntity = {
      id: 'bla',
      firstName: 'blub',
      lastName: 'blub',
      email: 'blipidy',
      features: {
        LTI_SLS_TERMS_BUTTON: true,
      },
      organisation: {
        id: 'orgId',
        name: 'Wayne Enterprises',
      },
    };

    const users: User[] = UserConverter.convertUsers({
      _embedded: {
        users: [entity],
      },
    });

    expect(users[0]).toEqual({
      id: 'bla',
      firstName: 'blub',
      lastName: 'blub',
      email: 'blipidy',
      features: {
        LTI_SLS_TERMS_BUTTON: true,
      },
      organisation: {
        id: 'orgId',
        name: 'Wayne Enterprises',
      },
    });
  });
});
