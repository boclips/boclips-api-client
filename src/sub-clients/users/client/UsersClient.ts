export interface UsersClient {
  isUserActive(id: string): Promise<boolean>;
}
