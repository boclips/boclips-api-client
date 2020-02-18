import { convertToBestForTag } from './convertToBestForTag';

describe('convertToBestForTag', () => {
  it('does not map the userId property even when it is on the json', () => {
    const converted = convertToBestForTag({
      id: 'Hello',
      label: 'World!',
      userId: 'Wow, this should not be here',
    });

    expect(converted).toStrictEqual({
      id: 'Hello',
      label: 'World!',
    });
  });
});
