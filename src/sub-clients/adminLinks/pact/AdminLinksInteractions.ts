import { InteractionObject, Matchers } from '@pact-foundation/pact';
import { provider } from '../../../pact-support/pactSetup';
import { LinkEntity } from '../../common/model/LinkEntity';

const { like } = Matchers;

export const sampleLink: LinkEntity = { href: 'href', templated: false };
export const VIDEO_SEARCH_URL =
  '/v1/videos{?query,id,sort_by,duration,duration_facets,duration_min,duration_max,released_date_from,released_date_to,source,age_range_min,age_range_max,age_range,age_range_facets,size,page,subject,subjects_set_manually,promoted,content_partner,channel,type}';
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
        searchCollections: like({
          href: `${provider.mockService.baseUrl}/v1/collections{?query,subject,projection,page,size}`,
          templated: true,
        }),
        myCollections: like({
          href: `${provider.mockService.baseUrl}/v1/users/{userId}/collections{?query,subject,projection,page,size}`,
          templated: true,
        }),
        jobs: like({
          href: `${provider.mockService.baseUrl}/v1/jobs?size={size}&page={page}{&manuallyCreated}`,
          templated: true,
        }),
        ingestVideos: like({
          href: `${provider.mockService.baseUrl}/v1/ingest-videos{?page,size,channel}`,
          templated: true,
        }),
        jobDetails: like({
          href: `${provider.mockService.baseUrl}/v1/jobs/{id}`,
          templated: true,
        }),
        orders: like({
          href: `${provider.mockService.baseUrl}/v1/orders`,
          templated: false,
        }),
        exportOrders: like(sampleLink),
        order: like({
          href: `${provider.mockService.baseUrl}/v1/orders/{id}`,
          templated: false,
        }),
        channels: like({
          href: `${provider.mockService.baseUrl}/v1/channels{?name}`,
          templated: true,
        }),
        channel: like({
          href: `${provider.mockService.baseUrl}/v1/channels/{id}`,
          templated: true,
        }),
        channelsSignedUploadLink: like({
          href: `${provider.mockService.baseUrl}/v1/channels/signed-upload-link`,
          templated: false,
        }),
        contracts: like({
          href: `${provider.mockService.baseUrl}/v1/contracts{?size,page}`,
          templated: true,
        }),
        createContracts: like({
          href: `${provider.mockService.baseUrl}/v1/contracts`,
          templated: false,
        }),
        contract: like({
          href: `${provider.mockService.baseUrl}/v1/contracts/{id}`,
          templated: true,
        }),
        createContractsSignedUploadLink: like({
          href: `${provider.mockService.baseUrl}/v1/contracts/signed-upload-link`,
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
        trackPlatformInteractedWith: like({
          href: `${provider.mockService.baseUrl}/v1/events/platform-interaction{?subtype,anonymous}`,
          templated: true,
        }),
        createSearchQueryCompletionsSuggestedEvent: like({
          href: `${provider.mockService.baseUrl}/v1/events/suggested-search-completions`,
          templated: false,
        }),
        organisations: like({
          href: `${provider.mockService.baseUrl}/v1/organisations{?countryCode,page,size}`,
          templated: true,
        }),
        video: like({
          href: `${provider.mockService.baseUrl}/v1/videos/{id}{?referer,shareCode}`,
          templated: true,
        }),
        searchVideos: like({
          href: `${provider.mockService.baseUrl}${VIDEO_SEARCH_URL}`,
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
        getCaptions: like({
          href: `${provider.mockService.baseUrl}/v1/videos/{id}/captions`,
          templated: true,
        }),
        ageRanges: like({
          href: `${provider.mockService.baseUrl}/v1/age-ranges`,
          templated: false,
        }),
        ingestVideoStatuses: like({
          href: `${provider.mockService.baseUrl}/v1/ingest-video-statuses`,
          templated: false,
        }),
        contractLegalRestrictions: like({
          href: `${provider.mockService.baseUrl}/v1/contract-legal-restrictions`,
          templated: false,
        }),
        suggestions: like({
          href: `${provider.mockService.baseUrl}/v1/suggestions?query={query}`,
          templated: true,
        }),
        contentWarnings: like({
          href: `${provider.mockService.baseUrl}/v1/content-warnings`,
          templated: false,
        }),
        validateShareCode: like({
          href: `${provider.mockService.baseUrl}/v1/users/{id}/shareCode/{shareCode}`,
          templated: true,
        }),
        attachmentTypes: like({
          href: `${provider.mockService.baseUrl}/v1/attachment-types`,
          templated: false,
        }),
        getContentPackages: like({
          href: `${provider.mockService.baseUrl}/v1/content-packages`,
          templated: false,
        }),
        getContentPackage: like({
          href: `${provider.mockService.baseUrl}/v1/content-packages/{id}`,
          templated: true,
        }),
        updateContentPackage: like({
          href: `${provider.mockService.baseUrl}/v1/content-packages/{id}`,
          templated: true,
        }),
      },
    },
  },
});
