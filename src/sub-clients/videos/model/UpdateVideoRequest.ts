import { AttachmentRequest } from '../../common/model/Attachment';

export interface UpdateVideoRequest {
  title?: string;
  description?: string;
  promoted?: boolean;
  subjectIds?: string[];
  contentWarningIds?: string[];
  ageRangeMin?: number;
  ageRangeMax?: number;
  tagId?: string;
  attachments?: AttachmentRequest[];
}
