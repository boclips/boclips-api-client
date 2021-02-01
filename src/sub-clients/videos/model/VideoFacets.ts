export interface VideoFacets {
  subjects: Facet[];
  ageRanges: Facet[];
  durations: Facet[];
  resourceTypes: Facet[];
  channels: Facet[];
  videoTypes: Facet[];
  prices: Facet[];
}

export interface Facet {
  hits: number;
  id: string;
  name: string;
}
