import URI from 'urijs';
import 'urijs/src/URITemplate';

export interface LinkEntity {
  href: string;
  templated?: boolean;
}

export class Link {
  private link: LinkEntity;

  constructor(link: LinkEntity) {
    this.link = link;
  }

  public getOriginalLink() {
    return this.link.href;
  }

  public get isTemplated(): boolean {
    return this.link.templated === true;
  }

  public getTemplatedLink(paramKeysValues: {
    [paramName: string]: any;
  }): string {
    return URI.expand(this.link.href, paramKeysValues).href();
  }
}
