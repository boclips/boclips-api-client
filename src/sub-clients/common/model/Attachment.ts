import { LinkEntity } from './LinkEntity';

export interface AttachmentEntity {
  id: string;
  type: string;
  description?: string;
  _links: {
    download: LinkEntity;
  };
}

export interface Attachment {
  type: AttachmentType;
  description?: string;
  linkToResource: string;
}

export enum AttachmentType {
  LESSON_PLAN = 'LESSON_PLAN',
  ACTIVITY = 'ACTIVITY',
}

export interface AttachmentRequest {
  type: string;
  linkToResource: string;
  description?: string;
}

export const getAttachmentType = (
  value: string,
): AttachmentType | undefined => {
  const matchedKey = Object.keys(AttachmentType).find(type => type === value);
  return matchedKey && AttachmentType[matchedKey];
};
