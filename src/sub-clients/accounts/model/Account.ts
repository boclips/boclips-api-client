import { Link } from '../../common/model/LinkEntity';

export interface Account {
  id: string;
  accessRuleIds: string[];
  accessExpiresOn: Date | null;
  organisation: Organisation;
  links: {
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
