import { VideoTypes } from '../model/VideoTypes';

export interface VideoTypesClient {
  getAll(): Promise<VideoTypes>;
}
