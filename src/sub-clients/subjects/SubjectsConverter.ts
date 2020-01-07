import { Link } from '../common/model/LinkEntity';
import { Subject } from './model/Subject';
import { SubjectLinks } from './model/SubjectLinks';

export class SubjectsConverter {
  public static convert(response: any): Subject {
    const links: SubjectLinks = {};
    if (response._links) {
      if (response._links.update && response._links.update.href) {
        links.update = new Link({ href: response._links.update.href });
      }
    }

    return {
      id: response.id,
      name: response.name,
      links,
    };
  }
}
