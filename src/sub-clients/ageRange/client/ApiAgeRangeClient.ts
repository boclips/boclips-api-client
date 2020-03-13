import { ApiSubClient } from '../../common/client/ApiSubClient';
import { AgeRange } from '../model/AgeRange';
import { AgeRangeClient } from './AgeRangeClient';
import { AxiosResponse } from 'axios';

export class ApiAgeRangeClient extends ApiSubClient implements AgeRangeClient {
  public async getAll(): Promise<AgeRange[]> {
    const eduLink = this.getLinkOrThrow('ageRanges');

    return this.axios
      .get(eduLink.href)
      .then(
        (eduResponse: AxiosResponse<any>) =>
          eduResponse.data._embedded.ageRanges,
      )
      .then(ageRanges =>
        ageRanges.map(({ id, min, max, label }) => ({ id, min, max, label })),
      );
  }
}
