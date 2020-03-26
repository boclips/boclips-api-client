export interface CreateCollectionRequest {
  title?: string;
  description?: string;
  videos: string[];
  public?: boolean;
}

export interface UpdateCollectionRequest {
  title?: string;
  public?: boolean;
  promoted?: boolean;
  subjects?: string[];
  description?: string;
  videos?: string[];
  attachment?: AttachmentRequest;
  ageRange?: AgeRangeRequest;
}

export interface AttachmentRequest {
  linkToResource: string;
  description?: string;
  type: string;
}

export interface AgeRangeRequest {
  min?: number;
  max?: number;
}

export interface ContentPartnerAgeRangeRequest {
  min?: number;
  max?: number;
  ids?: string[];
}
