import { Clearable } from '../../common/utils/Clearable';
import { EduAgeRange } from '../model/EduAgeRange';
import { EduAgeRangesClient } from './EduAgeRangesClient';

export class FakeEduAgeRangesClient implements EduAgeRangesClient, Clearable {
  private ageRanges: EduAgeRange[] = [];

  public insertEduAgeRangeFixture = (ageRange: EduAgeRange) =>
    this.ageRanges.push(ageRange);

  public getAll(): Promise<EduAgeRange[]> {
    return Promise.resolve(this.ageRanges);
  }

  public clear() {
    this.ageRanges = [];
  }
}
