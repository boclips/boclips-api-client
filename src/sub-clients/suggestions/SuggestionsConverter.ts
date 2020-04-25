import {
  ContentPartnerSuggestion,
  ContentPartnerSuggestionEntity,
  Suggestions,
  SuggestionsEntity,
} from './model/Suggestions';
import { Link } from '../common/model/LinkEntity';

export class SuggestionsConverter {
  public static convert(response: SuggestionsEntity): Suggestions {
    return {
      suggestionTerm: response.suggestionTerm,
      contentPartners: response.contentPartners.map(
        convertContentPartnerSuggestion,
      ),
    };
  }
}

function convertContentPartnerSuggestion(
  contentPartner: ContentPartnerSuggestionEntity,
): ContentPartnerSuggestion {
  return {
    name: contentPartner.name,
    links: {
      searchVideos: new Link({
        href: contentPartner._links.searchVideos.href,
        templated: contentPartner._links.searchVideos.templated,
      }),
    },
  };
}
