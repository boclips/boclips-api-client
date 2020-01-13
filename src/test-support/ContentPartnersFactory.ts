import { ContentPartner, Link } from '../types';
import { ContentPartnerRequest } from './../sub-clients/contentPartners/model/ContentPartnerRequest';

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

  public static createRequest(
    request: Partial<ContentPartnerRequest> = {},
  ): ContentPartnerRequest {
    return {
      name: request.name || 'Partner McPartnerFace',
      accreditedToYtChannelId: request.accreditedToYtChannelId || 'YT-2345678',
      legalRestrictions: request.legalRestrictions || {
        id: 'legal-123',
        text: 'Legal McLegalFace',
      },
      ageRange: request.ageRange || {
        min: 10,
        max: 11,
      },
      distributionMethods: [],
      currency: 'GBP',
    };
  }
}
