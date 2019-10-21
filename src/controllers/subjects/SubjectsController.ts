import { Subject } from '../../types';

export interface SubjectsController {
  getAll(): Promise<Subject[]>;
  update(currentSubject: Subject, newName: string): Promise<void>;
}
