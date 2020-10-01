import { User } from '../sub-clients/organisations/model/User';

export class UserFactory {
  public static sample(user: Partial<User> = {}): User {
    return {
      id: user.id || 'user-id',
      firstName: user.firstName || 'blub',
      lastName: user.lastName || 'blub',
      email: user.email || 'blipidy',
      features: user.features || {
        LTI_COPY_RESOURCE_LINK: false,
        LTI_SLS_TERMS_BUTTON: false,
        TEACHERS_HOME_BANNER: true,
        TEACHERS_HOME_SUGGESTED_VIDEOS: true,
        TEACHERS_HOME_PROMOTED_COLLECTIONS: true,
        TEACHERS_SUBJECTS: true,
      },
    };
  }
}
