import { SortKey } from './SortKey';

export interface VideoSearchRequest {
  query?: string;
  channel?: string[];
  id?: string[];
  page?: number;
  size?: number;
  sort_by?: SortKey;
  duration?: string[];
  duration_facets?: string[];
  age_range?: string[];
  age_range_facets?: string[];
  age_range_min?: number;
  age_range_max?: number;
  subject?: string[];
  promoted?: boolean;
  resource_types?: string[];
  resource_type_facets?: string[];
  type?: string[];
  video_type_facets?: string[];
  include_channel_facets?: boolean;
  prices?: string[];
}
