import { ApiBoclipsClient } from '../ApiBoclipsClient';
import { FakeBoclipsClient } from './FakeBoclipsClient';

export * from './FakeBoclipsClient';
export * from './CollectionsFactory';
export * from './ContentPartnersFactory';
export * from './OrderFactory';
export * from './SubjectsFactory';

export const isATestClient = (
  client: FakeBoclipsClient | ApiBoclipsClient,
): client is FakeBoclipsClient => {
  return (client as FakeBoclipsClient).clear !== undefined;
};
