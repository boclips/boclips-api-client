import { ContentPartner, Link } from '../types';

export class ContentPartnerFactory {
  public static sample(
    contentPartner: Partial<ContentPartner> = {},
  ): ContentPartner {
    const id = contentPartner.id || '123';
    return {
      id,
      name: contentPartner.name || 'Test name',
      official: contentPartner.official || true,
      ageRange: contentPartner.ageRange || { min: 10, max: 20, label: '10-20' },
      currency: contentPartner.currency || 'USD',
      legalRestrictions: contentPartner.legalRestrictions || {
        id: '2',
        text: 'a legal restriction',
      },
      links: contentPartner.links || {
        self: new Link({
          href: `/v1/content-partners/${id}`,
        }),
      },
      distributionMethods: contentPartner.distributionMethods || ['STREAM'],
    };
  }
}
