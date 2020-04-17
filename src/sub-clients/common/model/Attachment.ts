import { Link, LinkEntity } from './LinkEntity';

export interface AttachmentEntity {
  id: string;
  type: string;
  description?: string;
  _links: {
    download: LinkEntity;
  };
}

export interface Attachment {
  id: string;
  type: AttachmentType;
  description?: string;
  linkToResource: string;
  links: {
    download: Link;
  };
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

  if (!matchedKey) {
    throw Error(`${value} is not a valid attachment type`);
  }

  return AttachmentType[matchedKey as AttachmentType];
};
