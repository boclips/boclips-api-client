import {
  ChannelSuggestion,
  ChannelSuggestionEntity,
  SubjectSuggestion,
  SubjectSuggestionEntity,
  Suggestions,
  SuggestionsEntity,
} from './model/Suggestions';

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
    id: channel.id,
    name: channel.name
  };
}

function convertSubjectSuggestion(
  subject: SubjectSuggestionEntity,
): SubjectSuggestion {
  return {
    id: subject.id,
    name: subject.name
  };
}
