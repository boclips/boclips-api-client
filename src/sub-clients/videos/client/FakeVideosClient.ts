import { VideoFacets } from '../model/VideoFacets';
import { VideoSearchResults } from '../model/VideoSearchResults';
import { VideosClient } from './VideosClient';
import { Video } from '../model/Video';
import { Clearable } from '../../common/utils/Clearable';
import { UpdateVideoRequest } from '../model/UpdateVideoRequest';
import { VideoSearchRequest } from '../model/VideoSearchRequest';
import { PageableFactory } from '../../common/model/PageableFactory';
import { UpdateCaptionRequest } from '../model/UpdateCaptionRequest';
import { CaptionContent } from '../model/CaptionContent';
import { Link } from '../../common/model/LinkEntity';

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

  public search(
    searchRequest: VideoSearchRequest,
  ): Promise<VideoSearchResults> {
    const matchingVideos = this.videos.filter(video => {
      const matchedContentPartner = searchRequest.channel?.find(
        contentPartnerName => contentPartnerName === video.channel,
      );

      const matchedId = searchRequest.id?.find(id => id === video.id);

      return matchedContentPartner || matchedId;
    });

    const pageableVideos = PageableFactory.sample<Video>(matchingVideos, {
      number: searchRequest.page,
      size: searchRequest.size,
    });

    const facets: VideoFacets = {
      ageRanges: {},
      subjects: {},
      durations: {},
      resourceTypes: {},
    };

    if (searchRequest.age_range_facets) {
      searchRequest.age_range_facets.forEach(key => {
        facets.ageRanges[key] = { hits: 3 };
      });
    }

    if (searchRequest.duration_facets) {
      searchRequest.duration_facets.forEach(key => {
        facets.durations[key] = { hits: 3 };
      });
    }

    if (searchRequest.resource_type_facets) {
      searchRequest.resource_type_facets.forEach(key => {
        facets.ageRanges[key] = { hits: 3 };
      });
    }

    const searchResults: VideoSearchResults = {
      ...pageableVideos,
      facets,
    };

    return Promise.resolve(searchResults);
  }

  public async update(
    id: string,
    updateVideoRequest: UpdateVideoRequest,
  ): Promise<Video> {
    const videoIndex = await this.findVideoIndexById(id);

    const {
      title,
      description,
      additionalDescription,
      promoted,
      subjectIds,
      contentWarningIds,
      ageRangeMin,
      ageRangeMax,
      tagId,
    } = updateVideoRequest;
    const originalVideo = this.videos[videoIndex];

    const updatedVideo = {
      ...originalVideo,
      title: title ? title : originalVideo.title,
      description: description ? description : originalVideo.description,
      additionalDescription: additionalDescription
        ? additionalDescription
        : originalVideo.additionalDescription,
      promoted: promoted !== undefined ? promoted : originalVideo.promoted,
      ageRange:
        ageRangeMin || ageRangeMax
          ? { min: ageRangeMin, max: ageRangeMax }
          : originalVideo.ageRange,
      subjects: subjectIds
        ? subjectIds.map(id => ({ id, name: `subject${id}` }))
        : originalVideo.subjects,
      contentWarnings: contentWarningIds
        ? contentWarningIds.map(id => ({ id, label: `warning${id}` }))
        : originalVideo.contentWarnings,
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

  public async deleteThumbnail(video: Video): Promise<Video> {
    const videoIndex = await this.findVideoIndexById(video.id);
    this.videos[videoIndex].playback.links = {
      ...this.videos[videoIndex].playback.links,
      thumbnail: new Link({ href: 'thumbnailAfterDelete' }),
      deleteThumbnail: undefined,
      setThumbnailBySecond: new Link({ href: `setThumbnailBySecond` }),
    };

    return Promise.resolve(this.videos[videoIndex]);
  }

  public async setThumbnailBySecond(
    video: Video,
    second: number,
  ): Promise<Video> {
    const videoIndex = await this.findVideoIndexById(video.id);
    this.videos[videoIndex].playback.links = {
      ...this.videos[videoIndex].playback.links,
      thumbnail: new Link({ href: `thumbnailAt${second}` }),
      setThumbnailBySecond: undefined,
      deleteThumbnail: new Link({ href: `deleteThumbnail` }),
    };

    return Promise.resolve(this.videos[videoIndex]);
  }

  public async setCustomThumbnail(video: Video, file: File): Promise<Video> {
    const videoIndex = await this.findVideoIndexById(video.id);
    this.videos[videoIndex].playback.links = {
      ...this.videos[videoIndex].playback.links,
      thumbnail: new Link({ href: `defaultThumbnail_${file.name}` }),
      setThumbnailBySecond: undefined,
      deleteThumbnail: new Link({ href: `deleteThumbnail` }),
    };

    return Promise.resolve(this.videos[videoIndex]);
  }

  private findVideoIndexById(id: string): Promise<number> {
    const videoIndex = this.videos.findIndex(video => video.id === id);
    return videoIndex < 0
      ? Promise.reject(`No video found with id: ${id}`)
      : Promise.resolve(videoIndex);
  }
}
