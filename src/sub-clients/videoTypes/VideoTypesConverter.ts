import { VideoTypes } from './model/VideoTypes';

export class VideoTypesConverter {
  public static convert(response: any): VideoTypes {
    return {
      types: response._embedded.videoTypes,
    };
  }
}
