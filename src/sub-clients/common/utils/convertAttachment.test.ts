import { convertAttachment } from './convertAttachment';
import { AttachmentType } from '../model/Attachment';
import { AttachmentEntityFactory } from '../../../test-support/AttachmentsFactory';

describe('convert attachment', () => {
  it('valid attachment', () => {
    const attachmentEntity = AttachmentEntityFactory.sample({
      id: 'best-id',
      description: 'some description',
      type: 'ACTIVITY',
      _links: {
        download: {
          href: 'url.com',
          templated: false,
        },
      },
    });

    const attachment = convertAttachment(attachmentEntity);

    expect(attachment).toEqual({
      id: 'best-id',
      description: 'some description',
      linkToResource: 'url.com',
      type: AttachmentType.ACTIVITY,
      links: {
        download: {
          link: {
            href: 'url.com',
            templated: false,
          },
        },
      },
    });
  });

  it('invalid attachment due to unknown type', () => {
    const attachmentEntity = AttachmentEntityFactory.sample({
      type: 'UNKNOWN-ABC',
    });

    expect(() => {
      convertAttachment(attachmentEntity);
    }).toThrow(`UNKNOWN-ABC is not a valid attachment type`);
  });
});
