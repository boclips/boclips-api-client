import { VideoSearchResultsEntityFactory } from '../../../test-support/VideoSearchResultsEntityFactory';
import { VideosEntityFactory } from '../../../test-support/VideosEntityFactory';
import { VideosConverter } from './VideosConverter';
import { VideoSearchResultsConverter } from './VideoSearchResultsConverter';

describe('VideoSearchResultsConverter', () => {
  it('handles facets', () => {
    const videoEntity = VideosEntityFactory.sample({ title: 'Test video' });
    const searchResultsEntity = VideoSearchResultsEntityFactory.sample({
      _embedded: {
        videos: [videoEntity],
        facets: {
          ageRanges: {
            '3-4': { hits: 4 },
            '5-8': { hits: 2 },
          },
          subjects: {
            'Art History': { hits: 4 },
          },
          durations: {
            'P20-P40': { hits: 4 },
          },
          resourceTypes: {
            'Lesson Guide': { hits: 4 },
          },
          channels: {
            'TED channel': { hits: 2, id: 'ted-id' },
          },
        },
      },
    });

    const convertedResults = VideoSearchResultsConverter.convert(
      searchResultsEntity,
    );

    expect(convertedResults.page.length).toEqual(1);
    expect(convertedResults.page[0]).toEqual(
      VideosConverter.convert(videoEntity),
    );

    expect(convertedResults.facets).toEqual({
      ageRanges: {
        '3-4': { hits: 4 },
        '5-8': { hits: 2 },
      },
      subjects: {
        'Art History': { hits: 4 },
      },
      durations: {
        'P20-P40': { hits: 4 },
      },
      resourceTypes: {
        'Lesson Guide': { hits: 4 },
      },
      channels: {
        'TED channel': { hits: 2, id: 'ted-id' },
      },
    });
  });
});
