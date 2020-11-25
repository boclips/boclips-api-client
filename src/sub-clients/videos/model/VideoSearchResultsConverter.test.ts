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
            '3-4': { hits: 4, name: '3-4' },
            '5-8': { hits: 2, name: '5-8' },
            '9-12': { hits: 0, name: '9-12' },
          },
          subjects: {
            'art-id': { name: 'Art history', hits: 4 },
          },
          durations: {
            'P20-P40': { hits: 4 },
          },
          resourceTypes: {
            '123': { hits: 4, name: 'Lesson Guide' },
          },
          channels: {
            'ted-id': { hits: 2, name: 'TED channel' },
          },
          videoTypes: {
            stock: { name: 'Stock', hits: 10 },
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

    expect(convertedResults.facets?.ageRanges).toEqual([
      { id: '3-4', name: '3-4', hits: 4 },
      { id: '5-8', name: '5-8', hits: 2 },
      { id: '9-12', name: '9-12', hits: 0 },
    ]);
    expect(convertedResults.facets?.subjects).toEqual([
      { name: 'Art history', hits: 4, id: 'art-id' },
    ]);
    expect(convertedResults.facets?.durations).toEqual([
      {
        id: 'P20-P40',
        name: 'P20-P40',
        hits: 4,
      },
    ]);
    expect(convertedResults.facets?.resourceTypes).toEqual([
      {
        name: 'Lesson Guide',
        id: '123',
        hits: 4,
      },
    ]);
    expect(convertedResults.facets?.channels).toEqual([
      {
        name: 'TED channel',
        hits: 2,
        id: 'ted-id',
      },
    ]);
    expect(convertedResults.facets?.videoTypes).toEqual([
      {
        id: 'stock',
        hits: 10,
        name: 'Stock',
      },
    ]);
  });
});
