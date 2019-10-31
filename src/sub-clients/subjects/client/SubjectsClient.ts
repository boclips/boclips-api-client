import { Subject } from '../model/Subject';

export interface SubjectsClient {
  getAll(): Promise<Subject[]>;
  update(currentSubject: Subject, newName: string): Promise<void>;
}
