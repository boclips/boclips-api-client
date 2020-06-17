import { AttachmentType, getAttachmentType } from './Attachment';

describe('getAttachmentType', () => {
  it('look up ACTIVITY', () => {
    expect(getAttachmentType('ACTIVITY')).toEqual(AttachmentType.ACTIVITY);
  });

  it('look up LESSON_PLAN', () => {
    expect(getAttachmentType('LESSON_PLAN')).toEqual(
      AttachmentType.LESSON_PLAN,
    );
  });

  it('look up FINAL_PROJECT', () => {
    expect(getAttachmentType('FINAL_PROJECT')).toEqual(
      AttachmentType.FINAL_PROJECT,
    );
  });

  it('look up invalid type', () => {
    expect(() => {
      getAttachmentType('BOO');
    }).toThrow(`BOO is not a valid attachment type`);
  });
});
