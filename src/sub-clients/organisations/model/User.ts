export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  features: { [key in UserFeatureKey]?: boolean };
}

export type UserFeatureKey =
  | 'LTI_COPY_RESOURCE_LINK'
  | 'LTI_SLS_TERMS_BUTTON'
  | 'TEACHERS_HOME_BANNER'
  | 'TEACHERS_HOME_SUGGESTED_VIDEOS'
  | 'TEACHERS_HOME_PROMOTED_COLLECTIONS'
  | 'TEACHERS_SUBJECTS';
