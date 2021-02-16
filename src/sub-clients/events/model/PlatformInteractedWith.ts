import { EventRequest } from './EventRequest';

export interface PlatformInteractedWith extends EventRequest {
  type: 'PLATFORM_INTERACTED_WITH';
  subtype: string;
  anonymous?: boolean;
}
