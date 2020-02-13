import { ApiSubClient } from '../../common/client/ApiSubClient';
import { EduAgeRange } from '../model/EduAgeRange';
import { EduAgeRangesClient } from './EduAgeRangesClient';

export class ApiEduAgeRangesClient extends ApiSubClient
  implements EduAgeRangesClient {
  public async getAll(): Promise<EduAgeRange[]> {
    const eduLink = this.getLinkOrThrow('ageRanges');

    return this.axios
      .get(eduLink.href)
      .then(eduResponse => eduResponse.data._embedded.ageRanges);
  }
}
