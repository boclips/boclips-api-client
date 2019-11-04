import { Subject } from '../sub-clients/subjects/model/Subject';

export class SubjectFactory {
  public static sample = (subject: Partial<Subject>) => ({
    ...SubjectFactory.defaultSubject(),
    ...subject,
  });

  private static defaultSubject() {
    return {
      id: 'subject-id',
      name: 'Subject Name',
      updateLink: null,
    };
  }
}
