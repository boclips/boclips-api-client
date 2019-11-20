import { EventRequest } from './EventRequest';

export interface PageRenderedRequest extends EventRequest {
  url: string;
}
