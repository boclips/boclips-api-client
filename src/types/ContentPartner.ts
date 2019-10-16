import { AgeRange } from './AgeRange';
import { DistributionMethod } from './DistributionMethod';
import { LegalRestrictions } from './LegalRestrictions';
import { Link } from './Link';

export interface ContentPartner {
  id: string;
  name: string;
  official: boolean;
  ageRange?: AgeRange;
  currency?: string;
  legalRestrictions?: LegalRestrictions;
  _links?: { self: Link };
  distributionMethods: DistributionMethod[];
}

export class ContentPartnerFactory {
  public static sample(
    contentPartner: Partial<ContentPartner> = {},
  ): ContentPartner {
    const id = contentPartner.id || '123';
    return {
      id,
      name: contentPartner.name || 'Test name',
      official: contentPartner.official || true,
      ageRange: contentPartner.ageRange,
      currency: contentPartner.currency,
      legalRestrictions: contentPartner.legalRestrictions,
      _links: contentPartner._links || {
        self: {
          href: `/v1/content-partners/${id}`,
        },
      },
      distributionMethods: contentPartner.distributionMethods || [],
    };
  }
}
