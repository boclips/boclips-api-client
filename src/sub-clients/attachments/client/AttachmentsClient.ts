import { AttachmentType } from '../model/AttachmentType';

export interface AttachmentsClient {
  getTypes(): Promise<AttachmentType[]>;
}
