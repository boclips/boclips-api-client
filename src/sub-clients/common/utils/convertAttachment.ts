import {
  Attachment,
  AttachmentEntity,
  getAttachmentType,
} from '../model/Attachment';
import { convertLinks } from './convertLinks';

export const convertAttachment = (entity: AttachmentEntity): Attachment => {
  return {
    id: entity.id,
    type: getAttachmentType(entity.type)!,
    linkToResource: entity._links.download.href,
    description: entity.description,
    links: convertLinks(entity),
  };
};
