import {
  Attachment,
  AttachmentEntity,
  AttachmentType,
} from '../sub-clients/common/model/Attachment';
import { Link } from '../sub-clients/common/model/LinkEntity';

export class AttachmentEntityFactory {
  public static sample(entity: Partial<AttachmentEntity>): AttachmentEntity {
    const defaults: AttachmentEntity = {
      id: 'test-id',
      type: AttachmentType.LESSON_PLAN,
      description: null,
      _links: {
        download: {
          href: 'externallink.com',
          templated: false,
        },
      },
    };
    return { ...defaults, ...entity };
  }
}

export class AttachmentFactory {
  public static sample(attachment: Partial<Attachment>): Attachment {
    const defaults: Attachment = {
      id: 'test-id',
      type: AttachmentType.LESSON_PLAN,
      linkToResource: 'some-download-href',
      description: null,
      links: {
        download: new Link({ href: 'some-download-href', templated: false }),
      },
    };
    return { ...defaults, ...attachment };
  }
}
