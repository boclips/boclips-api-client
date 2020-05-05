import { VideosClient } from './VideosClient';
import { Video } from '../model/Video';
import { Clearable } from '../../common/utils/Clearable';
import { UpdateVideoRequest } from '../model/UpdateVideoRequest';
import { VideoSearchRequest } from '../model/VideoSearchRequest';
import Pageable from '../../common/model/Pageable';
import { PageableFactory } from '../../common/model/PageableFactory';
import { UpdateCaptionRequest } from '../model/UpdateCaptionRequest';
import { CaptionContent } from '../model/CaptionContent';

export class FakeVideosClient implements VideosClient, Clearable {
  private videos: Video[] = [];
  private videoCaptions: { videoId: string; content: string }[] = [];

  public get(id: string): Promise<Video> {
    const video = this.videos.find(video => video.id === id);
    return video === undefined ? Promise.reject() : Promise.resolve(video);
  }

  public getVideoProjection(): Promise<Video> {
    return Promise.resolve(this.videos[0]);
  }

  public search(searchRequest: VideoSearchRequest): Promise<Pageable<Video>> {
    const matchingVideos = this.videos.filter(video => {
      const matchedContentPartner = searchRequest.content_partner?.find(
        contentPartnerName => contentPartnerName === video.contentPartner,
      );

      const matchedId = searchRequest.id?.find(id => id === video.id);

      return matchedContentPartner || matchedId;
    });

    const payload = PageableFactory.sample<Video>(matchingVideos, {
      number: searchRequest.page,
      size: searchRequest.size,
    });

    return Promise.resolve(payload);
  }

  public update(
    id: string,
    updateVideoRequest: UpdateVideoRequest,
  ): Promise<Video> {
    const videoIndex = this.videos.findIndex(video => video.id === id);
    if (videoIndex < 0) Promise.reject(`No video found with id: ${id}`);

    const {
      title,
      description,
      promoted,
      subjectIds,
      ageRangeMin,
      ageRangeMax,
      tagId,
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
      bestFor: [{ label: `tag-${tagId}` }],
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

  public getCaptions(id: string): Promise<CaptionContent> {
    const captions = this.videoCaptions.find(it => it.videoId === id);
    return captions === undefined
      ? Promise.reject('Not found')
      : Promise.resolve({ content: captions.content });
  }

  public updateCaptions(
    id: string,
    updateCaptionsRequest: UpdateCaptionRequest,
  ): Promise<string> {
    const captionIndex = this.videoCaptions.findIndex(it => it.videoId === id);

    if (captionIndex !== -1) {
      this.videoCaptions[captionIndex].content = updateCaptionsRequest.captions;
      return Promise.resolve(updateCaptionsRequest.captions);
    } else {
      return Promise.reject('Not found');
    }
  }

  public addCaptions(videoId: string, captionContent: string): void {
    this.videoCaptions.push({ videoId: videoId, content: captionContent });
  }
}
