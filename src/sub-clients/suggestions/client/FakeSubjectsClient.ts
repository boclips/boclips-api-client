import { Clearable } from '../../common/utils/Clearable';
import { SuggestionsClient } from './SuggestionsClient';
import { Suggestions } from '../model/Suggestions';

export class FakeSuggestionsClient implements SuggestionsClient, Clearable {
  private suggestions: Suggestions = this.populateDefault();
  private requestedSuggestions: string[] = [];

  public suggest(query: string): Promise<Suggestions> {
    this.requestedSuggestions.push(query);
    return Promise.resolve(this.suggestions);
  }

  public clear(): void {
    this.suggestions = this.populateDefault();
    this.requestedSuggestions = [];
  }

  public populate(suggestions: Suggestions) {
    this.suggestions = suggestions;
  }

  private populateDefault(): Suggestions {
    return {
      suggestionTerm: 'ted',
      contentPartners: [
        {
          name: 'Ted',
        },
      ],
    };
  }
}
