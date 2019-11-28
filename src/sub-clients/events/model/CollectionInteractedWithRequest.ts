import { EventRequest } from './EventRequest';

export interface CollectionInteractedWithRequest extends EventRequest {
  subtype: string;
}
