import { SubjectLinks } from './SubjectLinks';

export interface Subject {
  id: string;
  name: string;
  lessonPlan: boolean;
  links?: SubjectLinks;
}

export interface UpdateSubjectRequest {
  name: string;
}
