import { InteractionObject } from '@pact-foundation/pact';
import { eachLike } from '@pact-foundation/pact/dsl/matchers';

export const getSuggestions = (): InteractionObject => ({
  state: undefined,
  uponReceiving: 'GET suggestions',
  withRequest: {
    method: 'GET',
    path: '/v1/suggestions',
    query: 'query=his',
  },
  willRespondWith: {
    status: 200,
    headers: {
      'Content-Type': 'application/hal+json;charset=UTF-8',
    },
    body: {
      suggestionTerm: 'his',
      channels: eachLike({
        name: 'The History Channel',
        _links: {
          searchVideos: {
            href:
              'https://api.boclips.com/v1/videos?query=ted{&id,sort_by,duration,duration_facets,duration_min,duration_max,released_date_from,released_date_to,source,age_range_min,age_range_max,age_range,age_range_facets,size,page,subject,subjects_set_manually,promoted,content_partner,type}',
            templated: true,
          },
        },
      }),
      subjects: eachLike({
        name: 'Art History',
        _links: {
          searchVideos: {
            href:
              'https://api.boclips.com/v1/videos?query=ted{&id,sort_by,duration,duration_facets,duration_min,duration_max,released_date_from,released_date_to,source,age_range_min,age_range_max,age_range,age_range_facets,size,page,subject,subjects_set_manually,promoted,content_partner,type}',
            templated: true,
          },
        },
      }),
    },
  },
});
