import { VideoTypesClient } from './VideoTypesClient';
import { Clearable } from '../../common/utils/Clearable';
import { VideoTypes } from '../model/VideoTypes';

export class FakeVideoTypesClient implements VideoTypesClient, Clearable {
  private videoTypes: VideoTypes;

  public insertVideoTypesFixture(videoTypes: VideoTypes) {
    this.videoTypes = videoTypes;
  }

  public getAll(): Promise<VideoTypes> {
    return Promise.resolve(this.videoTypes);
  }

  public clear() {
    this.videoTypes = undefined;
  }
}
