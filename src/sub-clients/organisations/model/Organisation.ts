import { Link } from '../../common/model/LinkEntity';

export interface Organisation {
  id: string;
  accessRuleIds: string[];
  accessExpiresOn: Date | null;
  organisationDetails: OrganisationDetails;
  links: {
    edit?: Link;
  };
}

export interface OrganisationDetails {
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
