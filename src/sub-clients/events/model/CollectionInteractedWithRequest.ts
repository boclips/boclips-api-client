import { EventRequest } from './EventRequest';

export interface CollectionInteractedWithRequest extends EventRequest {
  subtype: CollectionInteractionType;
}

export enum CollectionInteractionType {
  NAVIGATE_TO_COLLECTION_DETAILS = 'NAVIGATE_TO_COLLECTION_DETAILS',
}