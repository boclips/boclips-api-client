import { Subject } from '../model/Subject';
import { SubjectsClient } from './SubjectsClient';

export class FakeSubjectsClient implements SubjectsClient {
  private subjects: Subject[] = [];

  public insertSubject(subject: Subject) {
    this.subjects.push(subject);
  }
  public getAll(): Promise<Subject[]> {
    return Promise.resolve(this.subjects);
  }

  public async update(currentSubject: Subject, newName: string): Promise<void> {
    if (!currentSubject.updateLink) {
      throw new Error('Update link not available');
    }

    const subject = this.subjects.find(it => it.id === currentSubject.id);
    subject.name = newName;
  }
}
