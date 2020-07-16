import { EventRequest } from './EventRequest';

export interface SearchQueryCompletionsSuggestedRequest extends EventRequest {
  searchQuery: string;
  impressions: string[];
  componentId: string;
  completionId: string;
}
