import { AttachmentType } from '../model/AttachmentType';

export function convert(response: any): AttachmentType {
  return {
    name: response.name,
    label: response.label,
  };
}
