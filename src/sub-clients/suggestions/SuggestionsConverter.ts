import {
  ChannelSuggestion,
  ChannelSuggestionEntity,
  Suggestions,
  SuggestionsEntity,
} from './model/Suggestions';
import { Link } from '../common/model/LinkEntity';

export class SuggestionsConverter {
  public static convert(response: SuggestionsEntity): Suggestions {
    return {
      suggestionTerm: response.suggestionTerm,
      channels: response.channels.map(convertChannelSuggestion),
    };
  }
}

function convertChannelSuggestion(
  channel: ChannelSuggestionEntity,
): ChannelSuggestion {
  return {
    name: channel.name,
    links: {
      searchVideos: new Link({
        href: channel._links.searchVideos.href,
        templated: channel._links.searchVideos.templated,
      }),
    },
  };
}
