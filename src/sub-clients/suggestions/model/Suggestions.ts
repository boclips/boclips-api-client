import { Link } from '../../common/model/LinkEntity';
import { EntityWithLinks } from '../../common/model/common';

export interface Suggestions {
  suggestionTerm: string;
  channels: ChannelSuggestion[];
}

export interface ChannelSuggestion {
  name: string;
  links?: {
    searchVideos?: Link;
  };
}

export interface SuggestionsEntity {
  suggestionTerm: string;
  channels: ChannelSuggestionEntity[];
}

export interface ChannelSuggestionEntity extends EntityWithLinks {
  name: string;
  _links: {
    searchVideos: {
      href: string;
      templated: boolean;
    };
  };
}
