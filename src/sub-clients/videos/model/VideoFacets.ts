export interface VideoFacets {
  subjects: {
    [id: string]: Facet;
  };
  ageRanges: {
    [id: string]: Facet;
  };
  durations: {
    [id: string]: Facet;
  };
  resourceTypes: {
    [id: string]: Facet;
  };
  channels?: {
    [id: string]: Facet;
  };
  videoTypes?: {
    [id: string]: Facet;
  };
}

export interface Facet {
  hits: number;
  id?: string | null;
}
