import { Subject, UpdateSubjectRequest } from '../model/Subject';

export interface SubjectsClient {
  getAll(): Promise<Subject[]>;
  update(subject: Subject, updateRequest: UpdateSubjectRequest): Promise<void>;
}
