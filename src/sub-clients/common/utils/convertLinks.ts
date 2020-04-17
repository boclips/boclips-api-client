import { EntityWithLinks } from '../model/common';
import { Link } from '../model/LinkEntity';

export const convertLinks = <
  E extends EntityWithLinks,
  R extends { [rel in keyof E['_links']]: Link | undefined }
>(
  entity: E,
): R => {
  // Use the links we received from the API
  const rels = Object.keys(entity._links);

  // Reduce the rels into a single object
  return rels.reduce((acc, rel) => {
    acc[rel] = new Link(entity._links[rel]!);

    return acc;
  }, {} as { [key: string]: Link }) as R;
};
