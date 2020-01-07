import { SubjectLinks } from './SubjectLinks';

export interface Subject {
  id: string;
  name: string;
  links?: SubjectLinks;
}

export interface UpdateSubjectRequest {
  name: string;
}
