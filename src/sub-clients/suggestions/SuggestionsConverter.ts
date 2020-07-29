import {
  ChannelSuggestion,
  ChannelSuggestionEntity,
  SubjectSuggestion,
  SubjectSuggestionEntity,
  Suggestions,
  SuggestionsEntity,
} from './model/Suggestions';
import { Link } from '../common/model/LinkEntity';

export class SuggestionsConverter {
  public static convert(response: SuggestionsEntity): Suggestions {
    return {
      suggestionTerm: response.suggestionTerm,
      channels: response.channels.map(convertChannelSuggestion),
      subjects: response.subjects.map(convertSubjectSuggestion),
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

function convertSubjectSuggestion(
  subject: SubjectSuggestionEntity,
): SubjectSuggestion {
  return {
    id: subject.id,
    name: subject.name,
    links: {
      searchVideos: new Link({
        href: subject._links.searchVideos.href,
        templated: subject._links.searchVideos.templated,
      }),
    },
  };
}
