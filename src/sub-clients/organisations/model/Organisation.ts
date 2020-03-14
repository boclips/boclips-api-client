import { Link } from '../../common/model/LinkEntity';

export interface Organisation {
  id: string;
  contentPackageId: string;
  accessExpiresOn: Date | null;
  organisationDetails: OrganisationDetails;
  links: {
    edit?: Link;
    associateUsers?: Link;
  };
}

export interface OrganisationDetails {
  type: 'SCHOOL' | 'DISTRICT' | 'API';
  name: string;
  domain: string;
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
