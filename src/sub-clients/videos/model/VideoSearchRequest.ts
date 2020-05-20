import { SortKey } from './SortKey';

export interface VideoSearchRequest {
  query?: string;
  content_partner?: string[];
  id?: string[];
  page?: number;
  size?: number;
  sort_by?: SortKey;
}
