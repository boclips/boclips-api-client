import { Clearable } from '../../common/utils/Clearable';
import { AttachmentType } from '../model/AttachmentType';
import { AttachmentsClient } from './AttachmentsClient';

export class FakeAttachmentsClient implements AttachmentsClient, Clearable {
  private attachmentTypes: AttachmentType[] = [];

  public insertAttachmentType(attachmentType: AttachmentType) {
    this.attachmentTypes.push(attachmentType);
  }

  public getTypes(): Promise<AttachmentType[]> {
    return Promise.resolve(this.attachmentTypes);
  }

  public clear() {
    this.attachmentTypes = [];
  }
}
