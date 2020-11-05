import { Clearable } from '../../common/utils/Clearable';
import { Subject, UpdateSubjectRequest } from '../model/Subject';
import { SubjectsClient } from './SubjectsClient';

export class FakeSubjectsClient implements SubjectsClient, Clearable {
  private subjects: Subject[] = [];

  public insertSubject(subject: Subject) {
    this.subjects.push(subject);
  }
  public getAll(): Promise<Subject[]> {
    return Promise.resolve(this.subjects);
  }

  public async update(
    currentSubject: Subject,
    updateRequest: UpdateSubjectRequest,
  ): Promise<void> {
    if (!currentSubject.links?.update) {
      throw new Error('Update link not available');
    }

    const subject = this.subjects.find((it) => it.id === currentSubject.id)!;
    subject.name = updateRequest.name;
  }

  public clear() {
    this.subjects = [];
  }
}
