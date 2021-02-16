import { EventRequest } from './EventRequest';

export interface VideoInteractedWith extends EventRequest {
  type: 'VIDEO_INTERACTED_WITH';
  subtype: string;
}
