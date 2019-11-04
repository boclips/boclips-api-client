import { AgeRange } from '../../common/model/AgeRange';
import { ModelWithLinks } from '../../common/model/common';
import { Link } from '../../common/model/LinkEntity';
import { Video } from '../../common/model/Video';
import { Subject } from '../../subjects/model/Subject';

export interface Collection extends ModelWithLinks {
  id: string;
  owner: string;
  title: string;
  videos: Video[];
  updatedAt: Date;
  public: boolean;
  mine: boolean;
  createdBy: string;
  subjects: Subject[];
  ageRange?: AgeRange;
  description?: string;
  attachments?: Attachment[];
  links: {
    self: Link;
    edit?: Link;
    remove?: Link;
    addVideo?: Link;
    removeVideo?: Link;
    bookmark?: Link;
    unbookmark?: Link;
  };
}

export interface Attachment {
  type: AttachmentType;
  description?: string;
  linkToResource: string;
}

export enum AttachmentType {
  LESSON_PLAN = 'LESSON_PLAN',
}

export const getAttachmentType = (
  value: string,
): AttachmentType | undefined => {
  const matchedKey = Object.keys(AttachmentType).find(type => type === value);
  return matchedKey && AttachmentType[matchedKey];
};
