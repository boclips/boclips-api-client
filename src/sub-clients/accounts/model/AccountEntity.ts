import { LinkEntity } from '../../common/model/LinkEntity';

export interface AccountEntity {
  id: string;
  accessRuleIds: string[];
  accessExpiresOn: string | null;
  organisation: OrganisationEntity;
  _links: {
    edit?: LinkEntity;
  };
}

export interface OrganisationEntity {
  name: string;
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
