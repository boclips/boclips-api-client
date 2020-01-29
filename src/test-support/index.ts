import { ApiBoclipsClient } from '../ApiBoclipsClient';
import { FakeBoclipsClient } from './FakeBoclipsClient';

export * from './FakeBoclipsClient';
export * from './CollectionsFactory';
export * from './ContentPartnersFactory';
export * from './OrdersFactory';
export * from './SubjectsFactory';
export * from './JobsFactory';
export * from './AccountFactory';
export * from './IngestVideosFactory';

export const isATestClient = (
  client: FakeBoclipsClient | ApiBoclipsClient,
): client is FakeBoclipsClient => {
  return (client as FakeBoclipsClient).clear !== undefined;
};
