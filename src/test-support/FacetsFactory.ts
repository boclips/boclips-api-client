import { Facet, VideoFacets } from '../sub-clients/videos/model/VideoFacets';

export class FacetsFactory {
  public static sample(facets: Partial<VideoFacets> = {}): VideoFacets {
    return {
      ...{
        ageRanges: [FacetFactory.sample({ id: 'age-range-id' })],
        channels: [],
        durations: [],
        resourceTypes: [FacetFactory.sample({ id: 'resource-id' })],
        subjects: [],
        videoTypes: [],
        prices: [],
      },
      ...facets,
    };
  }
}

export class FacetFactory {
  public static sample(facet: Partial<Facet> = {}): Facet {
    return {
      ...{
        id: 'my-facet-id',
        name: 'Facet name',
        hits: 10,
      },
      ...facet,
    };
  }
}
