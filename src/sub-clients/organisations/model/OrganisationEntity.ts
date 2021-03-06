import { LinkEntity } from '../../common/model/LinkEntity';

export interface OrganisationEntity {
  id: string;
  organisationDetails: OrganisationDetailsEntity;
  deal: DealEntity;
  _links: {
    edit?: LinkEntity;
    associateUsers?: LinkEntity;
  };
}

export interface OrganisationDetailsEntity {
  name: string;
  domain: string;
  type: 'SCHOOL' | 'DISTRICT' | 'API' | 'LTI_DEPLOYMENT';
  state: StateEntity | null | undefined;
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

export interface DealEntity {
  billing: boolean;
  contentPackageId?: string;
  accessExpiresOn?: string | null;
}
