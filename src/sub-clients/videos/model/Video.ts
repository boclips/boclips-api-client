import { Subject } from '../../subjects/model/Subject';
import { Playback } from '../../common/model/Playback';
import { AgeRange } from '../../common/model/AgeRange';
import { BestForTag } from '../../bestForTags/model/BestForTag';
import { Language } from './Language';
import { VideoType } from '../../videoTypes/model/VideoType';
import { Link } from '../../common/model/LinkEntity';
import { ModelWithLinks } from '../../common/model/common';
import { Attachment } from '../../common/model/Attachment';
import { CaptionStatus } from './CaptionStatus';

export interface Video extends ModelWithLinks {
  id: string;
  title: string;
  description: string;
  releasedOn: Date;
  playback: Playback;
  subjects: Subject[];
  badges: string[];
  legalRestrictions: string;
  ageRange: AgeRange;
  rating?: number;
  yourRating?: number;
  bestFor?: BestForTag[];
  createdBy: string;
  promoted: boolean;
  language: Language;
  attachments: Attachment[];
  links: {
    self: Link;
    logInteraction: Link;
    update?: Link;
    rate?: Link;
    tag?: Link;
    transcript?: Link;
    addAttachment?: Link;
    captions?: Link;
  };
  contentPartner?: string;
  contentPartnerId?: string;
  contentPartnerVideoId?: string;
  type?: VideoType;
  captionStatus?: CaptionStatus;
}
