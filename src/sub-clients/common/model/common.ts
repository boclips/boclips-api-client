import { Link, LinkEntity } from './LinkEntity';

export interface EntityWithLinks {
  _links: {
    [rel: string]: LinkEntity;
  };
}

export interface ModelWithLinks {
  links: {
    [rel: string]: Link;
  };
}