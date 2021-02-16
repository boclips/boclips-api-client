export interface EventRequest {
  type?: string;
}

export interface PlatformInteractedWith extends EventRequest {
  type: 'PLATFORM_INTERACTED_WITH';
  subtype: string;
  anonymous?: boolean;
}

export interface VideoInteractedWith extends EventRequest {
  type: 'VIDEO_INTERACTED_WITH';
  subtype: string;
}
