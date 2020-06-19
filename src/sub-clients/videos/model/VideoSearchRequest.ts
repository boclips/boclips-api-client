import { SortKey } from './SortKey';

export interface VideoSearchRequest {
  query?: string;
  channel?: string[];
  id?: string[];
  page?: number;
  size?: number;
  sort_by?: SortKey;
}
