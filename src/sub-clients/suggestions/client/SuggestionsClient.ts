import { Suggestions } from '../model/Suggestions';

export interface SuggestionsClient {
  suggest(query: string): Promise<Suggestions>;
}
