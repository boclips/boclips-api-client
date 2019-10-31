import { Subject } from './model/Subject';

export class SubjectsConverter {
  public static convert(response: any): Subject {
    return {
      id: response.id,
      name: response.name,
      updateLink:
        response._links && response._links.update && response._links.update.href
          ? response._links.update.href
          : undefined,
    };
  }
}
