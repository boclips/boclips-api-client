import { CaptionContent } from './CaptionContent';

export class CaptionsConverter {
  public static convert(entity: any): CaptionContent {
    return {
      content: entity.content,
    };
  }
}
