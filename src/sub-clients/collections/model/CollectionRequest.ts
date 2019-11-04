export interface CreateCollectionRequest {
  title?: string;
  description?: string;
  videos: string[];
  public?: boolean;
}

export interface UpdateCollectionRequest {
  title?: string;
  public?: boolean;
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
