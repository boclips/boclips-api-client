import { AxiosResponse } from 'axios';
import { ContentPartnerEntity } from './model/ContentPartnerEntity';

export class ContentPartnersConverter {
  public static convertEmbeddedResources(
    response: AxiosResponse,
  ): ContentPartnerEntity[] {
    return response.data._embedded.contentPartners.map(
      ContentPartnersConverter.convert,
    );
  }

  public static convertResource(response: AxiosResponse): ContentPartnerEntity {
    return ContentPartnersConverter.convert(response.data);
  }

  private static convert(resource: any): ContentPartnerEntity {
    const {
      id,
      name,
      official,
      ageRange,
      currency,
      legalRestrictions,
      _links,
      distributionMethods,
    } = resource;

    return {
      id,
      name,
      official,
      ageRange,
      currency,
      legalRestrictions,
      _links,
      distributionMethods,
    };
  }
}
