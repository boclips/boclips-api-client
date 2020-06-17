import { convert } from './AttachmentTypeConverter';

describe('AttachmentTypeConverter', () => {
  it('converts name and label', () => {
    const converted = convert({
      name: 'Hello',
      label: 'World!',
    });

    expect(converted).toStrictEqual({
      name: 'Hello',
      label: 'World!',
    });
  });
});
