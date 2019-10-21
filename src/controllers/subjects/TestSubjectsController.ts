import { Subject } from '../../types';
import { SubjectsController } from './SubjectsController';

export class TestSubjectsController implements SubjectsController {
  private subjects: Subject[] = [];

  public insertSubject(subject: Subject) {
    this.subjects.push(subject);
  }
  public getAll(): Promise<Subject[]> {
    return Promise.resolve(this.subjects);
  }

  public async update(currentSubject: Subject, newName: string): Promise<void> {
    const subject = this.subjects.find(it => it.id === currentSubject.id);
    subject.name = newName;
  }
}
