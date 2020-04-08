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
    videoWithLinks: Pick<Video, 'links'>,
    updateVideoRequest: UpdateVideoRequest,
  ): Promise<Video> {
    const updateLink = videoWithLinks.links.update?.getOriginalLink();

    if (!updateLink) Promise.reject('Video does not have update link');

    const videoId = updateLink.match(/.+\/v1\/videos\/(.+)\?.+/)[1];
    if (!videoId)
      Promise.reject(`Update link does not contain video id: ${updateLink}`);

    const videoIndex = this.videos.findIndex(video => video.id === videoId);
    if (videoIndex < 0) Promise.reject(`No video found with id: ${videoId}`);

    const {
      title,
      description,
      promoted,
      subjectIds,
      ageRangeMin,
      ageRangeMax,
    } = updateVideoRequest;
    const originalVideo = this.videos[videoIndex];

    const updatedVideo = {
      ...originalVideo,
      title: title ? title : originalVideo.title,
      description: description ? description : originalVideo.description,
      promoted: promoted !== undefined ? promoted : originalVideo.promoted,
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
  }

  public insertVideo(video: Video): void {
    this.videos.push(video);
  }
  public clear() {
    this.videos = [];
  }
}
