import { AxiosResponse } from 'axios';
import ContentPartner from '../types/ContentPartner';

export class ContentPartnersConverter {
  public static convertEmbeddedResources(
    response: AxiosResponse,
  ): ContentPartner[] {
    return response.data._embedded.contentPartners.map(this.convert);
  }

  public static convertResource(response: AxiosResponse): ContentPartner {
    return this.convert(response.data);
  }

  private static convert(resource: any): ContentPartner {
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
      selfLink: _links.self,
      distributionMethods,
    };
  }
}
