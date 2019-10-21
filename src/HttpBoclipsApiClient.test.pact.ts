import axios from 'axios';
import { BoclipsApiClient } from './BoclipsApiClient';
import { HttpBoclipsApiClient } from './HttpBoclipsApiClient';
import {
  getContentPartnerInteraction,
  getContentPartnersInteraction,
  updateContentPartner,
} from './test_support/interactions/contentPartnersInteractions';
import { getLegalRestrictions } from './test_support/interactions/legalRestrictions';
import { getBackofficeLinks } from './test_support/interactions/links';
import {
  existingSubjectFromStaging,
  getSubjects,
  updateSubject,
} from './test_support/interactions/subjects';
import { provider } from './test_support/pactSetup';
import { TestBoclipsApiClient } from './TestBoclipsApiClient';
import { ContentPartnerFactory } from './types';

beforeEach(async () => {
  await provider.addInteraction(getBackofficeLinks());
});

describe('legalRestrictions contract test', () => {
  beforeEach(async () => {
    await provider.addInteraction(getLegalRestrictions);
  });

  afterEach(() => provider.verify());

  it('can fetch all legal restrictions', async () => {
    const axiosInstance = axios.create();

    const client = await HttpBoclipsApiClient.initialize(
      axiosInstance,
      provider.mockService.baseUrl,
    );
    const response = await client.legalRestrictionsController.getAll();

    expect(response).toHaveLength(1);
    expect(response[0].id).toEqual('2');
    expect(response[0].text).toEqual('No restrictions');
  });
});

describe('contentPartners contract test', () => {
  afterEach(() => provider.verify());

  describe('all', () => {
    beforeEach(async () => {
      await provider.addInteraction(getContentPartnersInteraction());
    });

    it('can fetch all content partners', async () => {
      const axiosInstance = axios.create();

      const client = await HttpBoclipsApiClient.initialize(
        axiosInstance,
        provider.mockService.baseUrl,
      );

      const response = await client.contentPartnersController.getAll();

      expect(response).toHaveLength(1);
      expect(response[0].id).toEqual('1');
      expect(response[0].name).toEqual('a name');
      expect(response[0].official).toEqual(true);
      expect(response[0]._links.self.href).toContain('/v1/content-partners/1');
    });
  });

  describe('one', () => {
    beforeEach(async () => {
      await provider.addInteraction(
        getContentPartnerInteraction('5cf140c4c1475c47f7178678'),
      );
    });

    it('can fetch a content partner', async () => {
      const axiosInstance = axios.create();

      const client = await HttpBoclipsApiClient.initialize(
        axiosInstance,
        provider.mockService.baseUrl,
      );

      const contentPartner = await client.contentPartnersController.get(
        '5cf140c4c1475c47f7178678',
      );

      expect(contentPartner.id).toEqual('5cf140c4c1475c47f7178678');
      expect(contentPartner.name).toEqual('a name');
      expect(contentPartner.official).toEqual(true);
      expect(contentPartner.currency).toEqual('USD');
      expect(contentPartner.ageRange.min).toEqual(10);
      expect(contentPartner.ageRange.max).toEqual(20);
      expect(contentPartner.ageRange.label).toEqual('10-20');
      expect(contentPartner.legalRestrictions.id).toEqual('2');
      expect(contentPartner.legalRestrictions.text).toEqual(
        'a legal restriction',
      );
      expect(contentPartner.distributionMethods).toEqual(['STREAM']);
    });
  });

  describe('update one', () => {
    beforeEach(async () => {
      await provider.addInteraction(
        updateContentPartner('5cf140c4c1475c47f7178678'),
      );
    });

    it('can update a content partner', async () => {
      const axiosInstance = axios.create();

      const client = await HttpBoclipsApiClient.initialize(
        axiosInstance,
        provider.mockService.baseUrl,
      );

      await client.contentPartnersController.update(
        ContentPartnerFactory.sample({
          id: '5cf140c4c1475c47f7178678',
          _links: {
            self: {
              href: `${provider.mockService.baseUrl}/v1/content-partners/5cf140c4c1475c47f7178678`,
            },
          },
        }),
      );
    });
  });
});

describe('SubjectsController', () => {
  describe.each([['Real client', true], ['Fake client', false]])(
    'contract test using %s',
    (_: string, shouldUseRealClient: boolean) => {
      let client: BoclipsApiClient;

      beforeEach(async () => {
        if (shouldUseRealClient) {
          client = await HttpBoclipsApiClient.initialize(
            axios.create(),
            provider.mockService.baseUrl,
          );
        } else {
          client = new TestBoclipsApiClient();
          (client as TestBoclipsApiClient).subjectsController.insertSubject({
            id: existingSubjectFromStaging,
            name: 'Subject Sample',
            updateLink: `/v1/subjects/${existingSubjectFromStaging}`,
          });
        }
      });

      afterEach(() => {
        if (shouldUseRealClient) {
          return provider.verify();
        }
      });

      it(`can fetch all subjects `, async () => {
        await provider.addInteraction(getSubjects());

        const response = await client.subjectsController.getAll();

        expect(response).toHaveLength(1);
        expect(response[0].id).toEqual(existingSubjectFromStaging);
        expect(response[0].name).toEqual('Subject Sample');
        expect(response[0].updateLink).toMatch(
          new RegExp(`.*/v1/subjects/${existingSubjectFromStaging}$`),
        );
      });

      it('can update subjects', async () => {
        await provider.addInteraction(
          updateSubject(existingSubjectFromStaging),
        );

        await client.subjectsController.update(
          {
            id: existingSubjectFromStaging,
            name: 'Old name',
            updateLink: `${provider.mockService.baseUrl}/v1/subjects/${existingSubjectFromStaging}`,
          },
          'Design',
        );
      });

      it('cannot update subject without an updateLink', async () => {
        const updateCall = async () =>
          await client.subjectsController.update(
            {
              id: existingSubjectFromStaging,
              name: 'Old Design',
            },
            'Design',
          );

        await expect(updateCall()).rejects.toThrow(Error);
      });
    },
  );
});
