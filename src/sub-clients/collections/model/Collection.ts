import { AgeRange } from '../../common/model/AgeRange';
import { ModelWithLinks } from '../../common/model/common';
import { Link } from '../../common/model/LinkEntity';
import { Video } from '../../videos/model/Video';
import { Subject } from '../../subjects/model/Subject';
import { Attachment } from '../../common/model/Attachment';

export interface Collection extends ModelWithLinks {
  id: string;
  owner: string;
  title: string;
  videos: Video[];
  updatedAt: Date;
  discoverable: boolean;
  promoted?: boolean;
  mine: boolean;
  createdBy: string;
  subjects: Subject[];
  ageRange: AgeRange | null;
  description?: string | null;
  attachments?: Attachment[];
  links: {
    self: Link;
    edit?: Link;
    remove?: Link;
    addVideo?: Link;
    removeVideo?: Link;
    bookmark?: Link;
    unbookmark?: Link;
    interactedWith?: Link;
  };
}
