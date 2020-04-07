import { VideosClient } from './VideosClient';
import { Video } from '../model/Video';
import { Clearable } from '../../common/utils/Clearable';
import { UpdateVideoRequest } from '../model/UpdateVideoRequest';

export class FakeVideosClient implements VideosClient, Clearable {
  private videos: Video[] = [];

  public get(id: string): Promise<Video> {
    const video = this.videos.find(video => video.id === id);
    return video === undefined ? Promise.reject() : Promise.resolve(video);
  }

  public update(
    originalVideo: Video,
    updateVideoRequest: UpdateVideoRequest,
  ): Promise<Video> {
    const videoIndex = this.videos.findIndex(
      video => video.id === originalVideo.id,
    );
    if (videoIndex >= 0) {
      const {
        title,
        description,
        promoted,
        subjectIds,
        ageRangeMin,
        ageRangeMax,
      } = updateVideoRequest;

      const updatedVideo = {
        ...originalVideo,
        title: title ? title : originalVideo.title,
        description: description ? description : originalVideo.description,
        promoted: promoted ? promoted : originalVideo.promoted,
        ageRange:
          ageRangeMin || ageRangeMax
            ? { min: ageRangeMin, max: ageRangeMax }
            : originalVideo.ageRange,
        subjects: subjectIds
          ? subjectIds.map(id => ({ id, name: `subject${id}` }))
          : originalVideo.subjects,
      };

      this.videos[videoIndex] = updatedVideo;

      return Promise.resolve(this.videos[videoIndex]);
    } else {
      return Promise.reject();
    }
  }

  public insertVideo(video: Video): void {
    this.videos.push(video);
  }
  public clear() {
    this.videos = [];
  }
}
