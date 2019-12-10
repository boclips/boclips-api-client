import { Organisation } from './Organisation';
import { OrganisationEntityFactory } from '../../../test-support/OrganisationFactory';
import { OrganisationConverter } from './OrganisationConverter';

describe('Organisation converter', () => {
  it('can convert from an organisation', () => {
    const entity = OrganisationEntityFactory.sample({});

    const converted: Organisation = OrganisationConverter.convert(entity);

    expect(converted.id).toEqual(entity.id);
    expect(converted.name).toEqual(entity.name);
    expect(converted.type).toEqual(entity.type);
    expect(converted.state).toEqual(entity.state);
    expect(converted.accessExpiresOn).toEqual(entity.accessExpiresOn);
    expect(converted.links.self.getOriginalLink()).toEqual(entity._links.self.href);
    expect(converted.links.update.getOriginalLink()).toEqual(entity._links.update.href);
  });
});
