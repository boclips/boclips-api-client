import { AxiosResponse } from 'axios';
import { Link } from '../common/model/LinkEntity';
import { ContentPartner } from './model/ContentPartner';

export class ContentPartnersConverter {
  public static convertEmbeddedResources(
    response: AxiosResponse,
  ): ContentPartner[] {
    return response.data._embedded.contentPartners.map(
      ContentPartnersConverter.convert,
    );
  }

  public static convertResource(response: AxiosResponse): ContentPartner {
    return ContentPartnersConverter.convert(response.data);
  }

  private static convert(resource: any): ContentPartner {
    const {
      id,
      name,
      official,
      ageRange,
      currency,
      legalRestriction,
      _links,
      distributionMethods,
      description,
      awards,
      hubspotId,
      notes,
      contentCategories,
      language,
      contentTypes,
      oneLineDescription,
      marketingInformation,
      curriculumAligned,
      educationalResources,
      isTranscriptProvided,
      subjects,
      bestForTags,
    } = resource;

    return {
      id,
      name,
      official,
      ageRange,
      currency,
      legalRestriction,
      distributionMethods,
      description,
      awards,
      hubspotId,
      notes,
      contentCategories,
      language,
      contentTypes,
      oneLineDescription,
      marketingInformation,
      curriculumAligned,
      educationalResources,
      isTranscriptProvided,
      subjects,
      bestForTags,
      links: {
        self: new Link(_links.self),
      },
    };
  }
}
