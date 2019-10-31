export interface CreateCollectionRequest {
  title?: string;
  description?: string;
  videos: string[];
  public?: boolean;
}

export type UpdateCollectionRequest = Partial<CreateCollectionRequest>;
