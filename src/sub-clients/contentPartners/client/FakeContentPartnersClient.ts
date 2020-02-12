import { ContentPartnerFactory } from '../../../test-support';
import { Link } from '../../../types';
import { Clearable } from '../../common/utils/Clearable';
import { ContentCategories } from '../model/ContentCategories';
import { ContentPartner } from '../model/ContentPartner';
import { ContentPartnerRequest } from '../model/ContentPartnerRequest';
import { UpdateContentPartnerRequest } from '../model/UpdateContentPartnerRequest';
import { BoclipsApiError } from './../../../types/BoclipsApiError';
import { ContentPartnersClient } from './ContentPartnersClient';

export class FakeContentPartnersClient
  implements ContentPartnersClient, Clearable {
  private contentPartners: ContentPartner[] = [];

  private contentCategories = {
    categories: [
      { key: 'key 1', label: 'label 1' },
      { key: 'key 2', label: 'label 2' },
    ],
  };

  public create(request: ContentPartnerRequest): Promise<void> {
    const id = request.name + Date.now();
    this.contentPartners.push({
      id,
      name: request.name,
      official: request.accreditedToYtChannelId == null,
      ageRange: request.ageRange && {
        ...request.ageRange,
        label: `${request.ageRange.min}-${request.ageRange.max}`,
      },
      currency: request.currency,
      legalRestriction: request.legalRestrictions,
      distributionMethods: request.distributionMethods,
      contentCategories: request.contentCategories,
      description: request.description,
      awards: request.awards,
      notes: request.notes,
      hubspotId: request.hubspotId,
      language: request.language,
      contentTypes: request.contentTypes,
      links: { self: new Link({ href: `/v1/content-partners/${id}` }) },
      oneLineDescription: request.oneLineDescription,
      marketingInformation: request.marketingInformation,
    });

    return Promise.resolve();
  }

  public insertContentPartnerFixture(contentPartner: Partial<ContentPartner>) {
    this.contentPartners.push(ContentPartnerFactory.sample(contentPartner));
  }

  public getContentCategories(): Promise<ContentCategories> {
    return Promise.resolve(this.contentCategories);
  }

  public getAll(): Promise<ContentPartner[]> {
    return Promise.resolve(this.contentPartners);
  }

  public get(id: string): Promise<ContentPartner> {
    const retrievedContentPartner = this.contentPartners.find(i => i.id === id);

    if (retrievedContentPartner != undefined) {
      return Promise.resolve(retrievedContentPartner);
    } else {
      const error: BoclipsApiError = {
        error: 'Content partner not found',
        message: `No content partner found for this id: ${123}`,
        path: `/v1/content-partner/${id}`,
        timestamp: new Date(),
        status: 404,
      };
      return Promise.reject(error);
    }
  }

  public update(id: string, contentPartner: UpdateContentPartnerRequest) {
    const index = this.contentPartners.findIndex(i => i.id === id);

    if (index < 0) {
      return Promise.reject();
    }

    const updatedFields: Partial<ContentPartner> = {};

    if (contentPartner.ageRange) {
      const { min, max } = contentPartner.ageRange;
      updatedFields.ageRange = {
        min,
        max,
        label: min ? (max ? `${min}-${max}` : `${min}+`) : '',
      };
    }

    Object.keys(contentPartner).forEach(key => {
      if (key !== 'ageRange') {
        updatedFields[key] = contentPartner[key];
      }
    });

    this.contentPartners[index] = {
      ...this.contentPartners[index],
      ...updatedFields,
    };

    return Promise.resolve();
  }

  public clear() {
    this.contentPartners = [];
  }
}
