import { AgeRange } from '../../common/model/AgeRange';
import { EntityWithLinks } from '../../common/model/common';
import { LinkEntity } from '../../common/model/LinkEntity';

export interface CollectionEntity extends EntityWithLinks {
  id: string;
  owner: string;
  title: string;
  videos: any[];
  updatedAt: string;
  promoted: boolean;
  public: boolean;
  mine: boolean;
  createdBy: string;
  subjects: any[];
  ageRange: AgeRange | null;
  description: string | null;
  attachments: AttachmentEntity[];
  _links: {
    self: LinkEntity;
    edit?: LinkEntity;
    remove?: LinkEntity;
    addVideo?: LinkEntity;
    removeVideo?: LinkEntity;
    bookmark?: LinkEntity;
    unbookmark?: LinkEntity;
    myLatestRel?: LinkEntity;
  };
}

export interface AttachmentEntity {
  id: string;
  type: string;
  description?: string;
  _links: {
    download: LinkEntity;
  };
}
