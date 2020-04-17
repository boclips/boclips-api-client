import { ApiSubClient } from '../../common/client/ApiSubClient';
import { EduAgeRange } from '../model/EduAgeRange';
import { EduAgeRangesClient } from './EduAgeRangesClient';
import { AxiosResponse } from 'axios';

export class ApiEduAgeRangesClient extends ApiSubClient
  implements EduAgeRangesClient {
  public async getAll(): Promise<EduAgeRange[]> {
    const eduLink = this.getLinkOrThrow('ageRanges');

    return this.axios
      .get(eduLink.href)
      .then(
        (eduResponse: AxiosResponse<any>) =>
          eduResponse.data._embedded.ageRanges,
      )
      .then(ageRanges =>
        ageRanges.map((ageRange: any) => ({
          id: ageRange.id,
          min: ageRange.min,
          max: ageRange.max,
          label: ageRange.label,
        })),
      );
  }
}
