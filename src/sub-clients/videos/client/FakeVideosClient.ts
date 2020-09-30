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
  private validShareCode: { [id: string]: string } = {};
  private videoCaptions: { videoId: string; content: string }[] = [];
  private facets: VideoFacets = {
    ageRanges: {},
    subjects: {},
    durations: {},
    resourceTypes: {},
  };

  public get(id: string, referer?: string, shareCode?: string): Promise<Video> {
    const video = this.videos.find(video => video.id === id);
    if (video === undefined) return Promise.reject();

    const isAuthenticatedUser = !(referer || shareCode);
    const isShareCodeValid = this.validShareCode[referer || ''] === shareCode;

    return isAuthenticatedUser || isShareCodeValid
      ? Promise.resolve(video)
      : Promise.resolve(this.getVideoWithoutProtectedData(video));
  }

  public getVideoProjection(): Promise<Video> {
    return Promise.resolve(this.videos[0]);
  }

  public search(
    searchRequest: VideoSearchRequest,
  ): Promise<VideoSearchResults> {
    const matchingVideos = this.videos.filter(video => {
      const matchedChannel = searchRequest.channel?.find(
        channelId => channelId === video.channelId,
      );

      const matchedId = searchRequest.id?.find(id => id === video.id);

      const matchedSubject = searchRequest.subject?.some(subject =>
        video.subjects.map(s => s.id).includes(subject),
      );

      const matchedTitle = searchRequest.query
        ? video.title.indexOf(searchRequest.query) > -1 ||
          video.description.indexOf(searchRequest.query) > -1
        : false;

      const matchedPromoted = searchRequest.promoted ? video.promoted : false;

      return (
        matchedChannel ||
        matchedId ||
        matchedTitle ||
        matchedPromoted ||
        matchedSubject
      );
    });

    const pageableVideos = PageableFactory.sample<Video>(matchingVideos, {
      number: searchRequest.page,
      size: searchRequest.size,
    });

    const searchResults: VideoSearchResults = {
      ...pageableVideos,
      facets: this.facets,
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

  public setFacets(facets: VideoFacets): void {
    this.facets = facets;
  }

  public clear() {
    this.videos = [];
    this.validShareCode = {};
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
      setCustomThumbnail: new Link({ href: `setCustomThumbnail` }),
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
      setCustomThumbnail: undefined,
      deleteThumbnail: new Link({ href: `deleteThumbnail` }),
    };

    return Promise.resolve(this.videos[videoIndex]);
  }

  public async setCustomThumbnail(video: Video, file: File): Promise<Video> {
    if (file.name === 'error-file.jpg') {
      return Promise.reject('Error uploading file');
    }

    const videoIndex = await this.findVideoIndexById(video.id);
    this.videos[videoIndex].playback.links = {
      ...this.videos[videoIndex].playback.links,
      thumbnail: new Link({ href: `defaultThumbnail_${file.name}` }),
      setThumbnailBySecond: undefined,
      setCustomThumbnail: undefined,
      deleteThumbnail: new Link({ href: `deleteThumbnail` }),
    };

    return Promise.resolve(this.videos[videoIndex]);
  }

  public addValidShareCode(referer: string, shareCode: string) {
    this.validShareCode[referer] = shareCode;
  }

  private getVideoWithoutProtectedData(video: Video) {
    const newVideo: Video = {
      ...video,
      playback: {
        ...video.playback,
        links: {
          createPlayerInteractedWithEvent:
            video.playback.links.createPlayerInteractedWithEvent,
          thumbnail: video.playback.links.thumbnail,
        },
      },
      attachments: [],
    };
    return newVideo;
  }

  private findVideoIndexById(id: string): Promise<number> {
    const videoIndex = this.videos.findIndex(video => video.id === id);
    return videoIndex < 0
      ? Promise.reject(`No video found with id: ${id}`)
      : Promise.resolve(videoIndex);
  }
}
