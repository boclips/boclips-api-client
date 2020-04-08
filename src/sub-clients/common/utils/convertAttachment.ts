import {
  Attachment,
  AttachmentEntity,
  getAttachmentType,
} from '../model/Attachment';

export const convertAttachment = (entity: AttachmentEntity): Attachment => {
  const type = getAttachmentType(entity.type);
  if (!type) {
    throw Error(`${type} is not a valid attachment type`);
  }
  return {
    type,
    linkToResource: entity._links.download.href,
    description: entity.description,
  };
};
