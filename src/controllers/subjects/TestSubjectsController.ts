import { Subject } from '../../types/Subject';
import { SubjectsController } from './SubjectsController';

export class TestSubjectsController implements SubjectsController {
  private subjects: Subject[] = [];

  public insertSubject(subject: Subject) {
    this.subjects.push(subject);
  }
  public getAll(): Promise<Subject[]> {
    return Promise.resolve(this.subjects);
  }
}
