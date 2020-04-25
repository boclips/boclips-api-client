import { Link } from '../../common/model/LinkEntity';
import { EntityWithLinks } from '../../common/model/common';

export interface Suggestions {
  suggestionTerm: string;
  contentPartners: ContentPartnerSuggestion[];
}

export interface ContentPartnerSuggestion {
  name: string;
  links?: {
    searchVideos?: Link;
  };
}

export interface SuggestionsEntity {
  suggestionTerm: string;
  contentPartners: ContentPartnerSuggestionEntity[];
}

export interface ContentPartnerSuggestionEntity extends EntityWithLinks {
  name: string;
  _links: {
    searchVideos: {
      href: string;
      templated: boolean;
    };
  };
}
