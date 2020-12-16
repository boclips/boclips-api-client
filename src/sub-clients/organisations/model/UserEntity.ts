export interface UserEntity {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  features: { [key: string]: boolean };
  organisation: {
    id: string;
    name: string;
  }
}
