import { AttachmentRequest } from '../../common/model/Attachment';

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

export interface AgeRangeRequest {
  min?: number;
  max?: number;
}

export interface ContentPartnerAgeRangeRequest {
  min?: number;
  max?: number;
  ids?: string[];
}
