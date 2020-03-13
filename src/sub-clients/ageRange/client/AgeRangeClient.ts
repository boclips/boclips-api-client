import { AgeRange } from '../model/AgeRange';

export interface AgeRangeClient {
  getAll(): Promise<AgeRange[]>;
}
