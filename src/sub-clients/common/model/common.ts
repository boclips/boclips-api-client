import { Link, LinkEntity } from './LinkEntity';

export interface EntityWithLinks {
  _links: {
    [rel: string]: LinkEntity | undefined;
  };
}

export interface ModelWithLinks {
  links: {
    [rel: string]: Link | undefined;
  };
}
