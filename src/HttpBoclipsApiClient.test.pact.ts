import axios from 'axios';
import { BoclipsApiClient } from './BoclipsApiClient';
import { HttpBoclipsApiClient } from './HttpBoclipsApiClient';
import {
  existingRestrictionFromStaging,
  getContentPartnerInteraction,
  getContentPartnersInteraction,
  updateContentPartner,
} from './test-support/interactions/contentPartnersInteractions';
import { getLegalRestrictions } from './test-support/interactions/legalRestrictions';
import { getHttpFeeds, createHttpFeed } from './test-support/interactions/httpFeeds';
import { getBackofficeLinks } from './test-support/interactions/links';
import {
  existingSubjectFromStaging,
  getSubjects,
  updateSubject,
} from './test-support/interactions/subjects';
import { provider } from './test-support/pactSetup';
import { TestBoclipsApiClient } from './TestBoclipsApiClient';
import { ContentPartnerFactory } from './types';

beforeEach(async () => {
  await provider.addInteraction(getBackofficeLinks());
});

describe('Pact tests', () => {
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
        }
      });

      afterEach(() => {
        if (shouldUseRealClient) {
          return provider.verify();
        }
      });

      describe('FeedController', () => {

        beforeEach(async () => {
            if (!shouldUseRealClient) {
              (client as TestBoclipsApiClient).feedsController.insert(
                { name: 'test name', url: 'test url', provider: 'youtube' },
              );
            }
         });

        /* TODO remove created test feed after verification, so the next time we can create it again
            currently this would fail when testing against staging, because the feed is duplicate
        */
        xit('can create new feed', async () => {
          await provider.addInteraction(createHttpFeed);

          await client.feedsController.create({name: 'Feed Test', url: 'https://www.test.com/',
            provider: 'Youtube', format: 'YOUTUBE'});
        });

        it('can fetch all feeds', async () => {
            await provider.addInteraction(getHttpFeeds('youtube'));

            const response = await client.feedsController.getAll('youtube');

            expect(response).toHaveLength(1);
            expect(response[0].name).toEqual('test name');
            expect(response[0].url).toEqual('test url');
            expect(response[0].provider).toEqual('youtube');
        });
      });

      describe('LegalRestrictionsController', () => {
        beforeEach(async () => {
          if (!shouldUseRealClient) {
            (client as TestBoclipsApiClient).legalRestrictionsController.insertLegalRestrictionsFixture(
              { id: '2', text: 'No restrictions' },
            );
          }
        });

        it('can fetch all legal restrictions', async () => {
          await provider.addInteraction(getLegalRestrictions);

          const response = await client.legalRestrictionsController.getAll();

          expect(response).toHaveLength(1);
          expect(response[0].id).toEqual('2');
          expect(response[0].text).toEqual('No restrictions');
        });
      });

      describe('ContentPartnersController', () => {
        beforeEach(async () => {
          if (!shouldUseRealClient) {
            (client as TestBoclipsApiClient).contentPartnersController.insertContentPartnerFixture(
              ContentPartnerFactory.sample({
                id: existingRestrictionFromStaging,
                name: 'a name',
                official: true,
              }),
            );
          }
        });

        it('can fetch all content partners', async () => {
          await provider.addInteraction(getContentPartnersInteraction());
          const response = await client.contentPartnersController.getAll();

          expect(response).toHaveLength(1);
          expect(response[0].id).toEqual(existingRestrictionFromStaging);
          expect(response[0].name).toEqual('a name');
          expect(response[0].official).toEqual(true);
          expect(response[0]._links.self.href).toContain(
            `/v1/content-partners/${existingRestrictionFromStaging}`,
          );
        });

        it('can fetch a content partner', async () => {
          await provider.addInteraction(
            getContentPartnerInteraction(existingRestrictionFromStaging),
          );
          const contentPartner = await client.contentPartnersController.get(
            existingRestrictionFromStaging,
          );

          expect(contentPartner.id).toEqual(existingRestrictionFromStaging);
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

        it('can update a content partner', async () => {
          await provider.addInteraction(
            updateContentPartner(existingRestrictionFromStaging),
          );
          await client.contentPartnersController.update(
            ContentPartnerFactory.sample({
              id: existingRestrictionFromStaging,
              _links: {
                self: {
                  href: `${provider.mockService.baseUrl}/v1/content-partners/${existingRestrictionFromStaging}`,
                },
              },
            }),
          );
        });
      });

      describe('SubjectsController', () => {
        beforeEach(async () => {
          if (!shouldUseRealClient) {
            (client as TestBoclipsApiClient).subjectsController.insertSubject({
              id: existingSubjectFromStaging,
              name: 'Subject Sample',
              updateLink: `/v1/subjects/${existingSubjectFromStaging}`,
            });
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
      });
    },
  );
});
