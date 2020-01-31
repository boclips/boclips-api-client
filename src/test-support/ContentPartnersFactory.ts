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
      legalRestriction: contentPartner.legalRestriction || {
        id: '2',
        text: 'a legal restriction',
      },
      links: contentPartner.links || {
        self: new Link({
          href: `/v1/content-partners/${id}`,
        }),
      },
      distributionMethods: contentPartner.distributionMethods || ['STREAM'],
      description: contentPartner.description || 'this is a description',
      language: contentPartner.language || { code: 'spa', name: 'Spanish' },
      contentCategories: contentPartner.contentCategories || [
        { key: 'ANY_KEY', label: 'Any label' },
      ],
      awards: contentPartner.awards || 'Big famous award',
      notes: contentPartner.notes || 'Something noteworthy',
      hubspotId: contentPartner.hubspotId || '666',
      contentTypes: contentPartner.contentTypes || ['NEWS', 'STOCK'],
    };
  }
}
