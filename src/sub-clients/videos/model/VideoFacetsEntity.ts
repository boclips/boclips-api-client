export interface VideoFacetsEntity {
  subjects: {
    [id: string]: FacetEntity;
  };
  ageRanges: {
    [id: string]: FacetEntity;
  };
  durations: {
    [id: string]: FacetEntity;
  };
  resourceTypes: {
    [id: string]: FacetEntity;
  };
  channels?: {
    [id: string]: FacetEntity;
  };
  videoTypes?: {
    [id: string]: FacetEntity;
  };
}

export interface FacetEntity {
  hits: number;
  id?: string | null;
  name?: string | null;
}
