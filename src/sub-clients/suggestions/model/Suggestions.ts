import { EntityWithLinks } from '../../common/model/common';

export interface Suggestions {
  suggestionTerm: string;
  channels: ChannelSuggestion[];
  subjects: SubjectSuggestion[];
}

export interface ChannelSuggestion {
  id: string;
  name: string;
}

export interface SubjectSuggestion {
  id: string;
  name: string;
}

export interface SuggestionsEntity {
  suggestionTerm: string;
  channels: ChannelSuggestionEntity[];
  subjects: SubjectSuggestionEntity[];
}

export interface ChannelSuggestionEntity extends EntityWithLinks {
  id: string;
  name: string;
}

export interface SubjectSuggestionEntity extends EntityWithLinks {
  id: string;
  name: string;
}
