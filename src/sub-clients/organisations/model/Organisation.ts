import { Link } from '../../common/model/LinkEntity';

export interface Organisation {
  id: string;
  name: string;
  type: 'District' | 'School';
  state?: string;
  accessExpiresOn?: Date;
  links: {
    self: Link;
    update: Link;
  };
}

export interface OrganisationAccountEntity {
  id?: string;
  contractIds: string[];
  accessExpiresOn?: string;
  organisation: OrganisationEntity;
}

export interface OrganisationEntity {
  name: string;
  type?: string;
  state?: StateEntity;
  country?: CountryEntity;
}

interface StateEntity {
  id: string;
  name: string;
}
interface CountryEntity {
  id: string;
  name: string;
  states?: StateEntity[];
}
