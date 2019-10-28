import { AgeRange } from '../types/AgeRange';
import { Link, LinkEntity } from '../types/LinkEntity';
import { Subject } from '../types/Subject';
import Video from '../types/Video';

export interface EntityWithLinks {
  _links: {
    [rel: string]: LinkEntity;
  };
}

export interface CollectionEntity extends EntityWithLinks {
  id: string;
  owner: string;
  title: string;
  videos: any[];
  updatedAt: string;
  public: boolean;
  mine: boolean;
  createdBy: string;
  subjects: any[];
  ageRange: AgeRange | null;
  description: string | null;
  attachments: any[];
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

export interface ModelWithLinks {
  links: {
    [rel: string]: Link;
  };
}

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
  attachments?: any[];
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
