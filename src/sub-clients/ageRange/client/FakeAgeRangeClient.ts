import { Clearable } from '../../common/utils/Clearable';
import { AgeRange } from '../model/AgeRange';
import { AgeRangeClient } from './AgeRangeClient';

export class FakeAgeRangeClient implements AgeRangeClient, Clearable {
  private ageRanges: AgeRange[] = [];

  public insertAgeRange = (ageRange: AgeRange) => this.ageRanges.push(ageRange);

  public getAll(): Promise<AgeRange[]> {
    return Promise.resolve(this.ageRanges);
  }

  public clear() {
    this.ageRanges = [];
  }
}
