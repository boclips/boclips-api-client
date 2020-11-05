import { ApiSubClient } from '../../common/client/ApiSubClient';
import { SuggestionsClient } from './SuggestionsClient';
import { Suggestions, SuggestionsEntity } from '../model/Suggestions';
import expandUrlTemplate from '../../common/utils/expandUrlTemplate';
import { SuggestionsConverter } from '../SuggestionsConverter';

export class ApiSuggestionsClient
  extends ApiSubClient
  implements SuggestionsClient {
  suggest(query: string): Promise<Suggestions> {
    const suggestionHref = expandUrlTemplate(
      this.getLinkOrThrow('suggestions').href,
      { query: query },
    );

    return this.axios
      .get<SuggestionsEntity>(suggestionHref)
      .then((response) => {
        const payload: SuggestionsEntity = response.data;
        return SuggestionsConverter.convert(payload);
      });
  }
}
