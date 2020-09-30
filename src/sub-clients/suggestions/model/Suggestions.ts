import { Link } from '../../common/model/LinkEntity';
import { EntityWithLinks } from '../../common/model/common';

export interface Suggestions {
  suggestionTerm: string;
  channels: ChannelSuggestion[];
  subjects: SubjectSuggestion[];
}

export interface ChannelSuggestion {
  id: string;
  name: string;
  links?: {
    searchVideos?: Link;
  };
}

export interface SubjectSuggestion {
  id: string;
  name: string;
  links?: {
    searchVideos?: Link;
  };
}

export interface SuggestionsEntity {
  suggestionTerm: string;
  channels: ChannelSuggestionEntity[];
  subjects: SubjectSuggestionEntity[];
}

export interface ChannelSuggestionEntity extends EntityWithLinks {
  id: string;
  name: string;
  _links: {
    searchVideos: {
      href: string;
      templated: boolean;
    };
  };
}

export interface SubjectSuggestionEntity extends EntityWithLinks {
  id: string;
  name: string;
  _links: {
    searchVideos: {
      href: string;
      templated: boolean;
    };
  };
}
