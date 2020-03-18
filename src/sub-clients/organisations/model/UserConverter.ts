import { User } from './User';

export class UserConverter {
  public static convert(response: any): User[] {
    const entities = response._embedded.users as UserEntity[];

    return entities.map(entity => {
      return {
        id: entity.id,
        firstName: entity.firstName,
        lastName: entity.lastName,
        email: entity.email,
      };
    });
  }
}
