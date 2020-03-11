import { LinkEntity } from '../../common/model/LinkEntity';

export interface OrganisationEntity {
  id: string;
  contentPackageId: string;
  accessExpiresOn: string | null;
  organisationDetails: OrganisationDetailsEntity;
  _links: {
    edit?: LinkEntity;
  };
}

export interface OrganisationDetailsEntity {
  name: string;
  domain: string;
  type: 'SCHOOL' | 'DISTRICT' | 'API';
  state: StateEntity | null;
  country: CountryEntity;
}

export interface StateEntity {
  id: string;
  name: string;
}

export interface CountryEntity {
  id: string;
  name: string;
  states: null;
}
