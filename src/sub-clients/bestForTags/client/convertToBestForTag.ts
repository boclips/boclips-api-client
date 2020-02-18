import { BestForTag } from '../model/BestForTag';

export function convertToBestForTag(json: any): BestForTag {
  return {
    id: json.id,
    label: json.label,
  };
}
