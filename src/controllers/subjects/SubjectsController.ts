import { Subject } from '../../types/Subject';

export interface SubjectsController {
  getAll(): Promise<Subject[]>;
}
