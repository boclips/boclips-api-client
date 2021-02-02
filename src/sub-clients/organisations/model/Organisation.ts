import { Link } from '../../common/model/LinkEntity';

export interface Organisation {
  id: string;
  deal: Deal;
  organisationDetails: OrganisationDetails;
  links: {
    edit?: Link;
    associateUsers?: Link;
  };
}

export interface OrganisationDetails {
  type: 'SCHOOL' | 'DISTRICT' | 'API' | 'LTI_DEPLOYMENT';
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

export interface Deal {
  contentPackageId?: string;
  accessExpiresOn: Date | null;
}
