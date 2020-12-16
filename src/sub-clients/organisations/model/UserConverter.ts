import { User } from './User';
import { UserEntity } from './UserEntity';

export class UserConverter {
  public static convert(userEntity: UserEntity): User {
    return {
      id: userEntity.id,
      firstName: userEntity.firstName,
      lastName: userEntity.lastName,
      email: userEntity.email,
      features: userEntity.features,
      organisation: { ...userEntity.organisation },
    };
  }

  public static convertUsers(response: any): User[] {
    const entities = response._embedded.users as UserEntity[];
    return entities.map(this.convert);
  }
}
