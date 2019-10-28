import { ContentPartnerEntity } from '../clients/contentPartners/model/ContentPartnerEntity';

export class ContentPartnerEntityFactory {
  public static sample(
    contentPartner: Partial<ContentPartnerEntity> = {},
  ): ContentPartnerEntity {
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
      _links: contentPartner._links || {
        self: {
          href: `/v1/content-partners/${id}`,
        },
      },
      distributionMethods: contentPartner.distributionMethods || ['STREAM'],
    };
  }
}
