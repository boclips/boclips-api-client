import { InteractionObject, Matchers } from '@pact-foundation/pact';
import { provider } from '../../../pact-support/pactSetup';
import { LinkEntity } from '../../common/model/LinkEntity';

const { like } = Matchers;

export const sampleLink: LinkEntity = { href: 'href', templated: false };

export const getAdminLinks = (): InteractionObject => ({
  state: undefined,
  uponReceiving: 'GET Admin Links',
  withRequest: {
    method: 'GET',
    path: '/v1/admin',
  },
  willRespondWith: {
    status: 200,
    headers: {
      'Content-Type': 'application/hal+json',
    },
    body: {
      _links: {
        collection: like({
          href: `${provider.mockService.baseUrl}/v1/collections/{id}`,
          templated: true,
        }),
        createCollection: like({
          href: `${provider.mockService.baseUrl}/v1/collections`,
          templated: false,
        }),
        adminCollectionSearch: like({
          href: `${provider.mockService.baseUrl}/v1/collections{?query,subject,projection,page,size}`,
          templated: true,
        }),
        jobs: like({
          href: `${provider.mockService.baseUrl}/v1/jobs?size={size}&page={page}{&manuallyCreated}`,
          templated: true,
        }),
        ingestVideos: like({
          href: `${provider.mockService.baseUrl}/v1/ingest-videos{?page,size,content_partner}`,
          templated: true,
        }),
        jobDetails: like({
          href: `${provider.mockService.baseUrl}/v1/jobs/{id}`,
          templated: true,
        }),
        adminSearch: like(sampleLink),
        orders: like({
          href: `${provider.mockService.baseUrl}/v1/orders`,
          templated: false,
        }),
        exportOrders: like(sampleLink),
        order: like({
          href: `${provider.mockService.baseUrl}/v1/orders/{id}`,
          templated: false,
        }),
        contentPartners: like({
          href: `${provider.mockService.baseUrl}/v1/content-partners{?name,official,accreditedToYtChannelId}`,
          templated: true,
        }),
        contentPartner: like({
          href: `${provider.mockService.baseUrl}/v1/content-partners/{id}`,
          templated: true,
        }),
        contentPartnersSignedUploadLink: like({
          href: `${provider.mockService.baseUrl}/v1/content-partners/signed-upload-link`,
          templated: false,
        }),
        contentPartnerContracts: like({
          href: `${provider.mockService.baseUrl}/v1/content-partner-contracts{?size,page}`,
          templated: true,
        }),
        createContentPartnerContracts: like({
          href: `${provider.mockService.baseUrl}/v1/content-partner-contracts`,
          templated: false,
        }),
        contentPartnerContract: like({
          href: `${provider.mockService.baseUrl}/v1/content-partner-contracts/{id}`,
          templated: true,
        }),
        createContentPartnerContractsSignedUploadLink: like({
          href: `${provider.mockService.baseUrl}/v1/content-partner-contracts/signed-upload-link`,
          templated: false,
        }),
        legalRestrictions: like({
          href: `${provider.mockService.baseUrl}/v1/legal-restrictions`,
          templated: false,
        }),
        distributionMethods: like(sampleLink),
        subjects: like({
          href: `${provider.mockService.baseUrl}/v1/subjects`,
          templated: false,
        }),
        searchAccessRules: like(sampleLink),
        trackPageRendered: like({
          href: `${provider.mockService.baseUrl}/v1/events/page-render`,
          templated: false,
        }),
        organisations: like({
          href: `${provider.mockService.baseUrl}/v1/organisations{?countryCode,page,size}`,
          templated: true,
        }),
        video: like({
          href: `${provider.mockService.baseUrl}/v1/videos/{id}`,
          templated: true,
        }),
        videoTypes: like({
          href: `${provider.mockService.baseUrl}/v1/video-types`,
          templated: false,
        }),
        contentCategories: like({
          href: `${provider.mockService.baseUrl}/v1/content-categories`,
          templated: false,
        }),
        tags: like({
          href: `${provider.mockService.baseUrl}/v1/tags`,
          templated: false,
        }),
        marketingStatuses: like({
          href: `${provider.mockService.baseUrl}/v1/marketing-statuses`,
          templated: false,
        }),
        ageRanges: like({
          href: `${provider.mockService.baseUrl}/v1/age-ranges`,
          templated: false,
        }),
        ingestVideoStatuses: like({
          href: `${provider.mockService.baseUrl}/v1/ingest-video-statuses`,
          templated: false,
        }),
      },
    },
  },
});
