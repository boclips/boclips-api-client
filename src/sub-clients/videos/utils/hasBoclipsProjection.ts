import { VideoWithBoclipsProjection, Video } from '../model/Video';

export const hasBoclipsProjection = (
  video: VideoWithBoclipsProjection | Video,
): video is VideoWithBoclipsProjection =>
  (video as VideoWithBoclipsProjection).contentPartner !== undefined;
