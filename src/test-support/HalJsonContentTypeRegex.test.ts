import regex from './HalJsonContentTypeRegex';

describe('HalJsonContentTypeRegex', () => {
  it('should satisfy application/hal+json content-type', async () => {
    const matcher = new RegExp(regex);

    expect(matcher.test('application/hal+json')).toEqual(true);
  });

  it('should satisfy application/hal+json;charset=UTF-8 content-type', async () => {
    const matcher = new RegExp(regex);

    expect(matcher.test('application/hal+json;charset=UTF-8')).toEqual(true);
  });
});
