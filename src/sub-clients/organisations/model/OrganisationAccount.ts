import { Link } from '../../common/model/LinkEntity';

export interface OrganisationAccount {
  id: string;
  contractIds: string[];
  accessExpiresOn: Date | null;
  organisation: Organisation;
  links: {
    self: Link;
    edit?: Link;
  };
}

export interface Organisation {
  type: 'SCHOOL' | 'DISTRICT';
  name: string;
  country: Country;
  state: State | null;
}

export interface Country {
  id: string;
  name: string;
}
export interface State {
  id: string;
  name: string;
}
