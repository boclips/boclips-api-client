import { EntityWithLinks } from '../../common/model/common';

export interface VideoEntity extends EntityWithLinks {
  id: string;
  title: string;
  description: string;
  releasedOn: string;
  playback: {
    type: string;
    id: string;
    duration: string;
    maxResolutionAvailable: boolean;
    _links: {
      createPlaybackEvent?: {
        href: string;
        templated: boolean;
      };
      createPlayerInteractedWithEvent: {
        href: string;
        templated: boolean;
      };
      thumbnail: {
        href: string;
        templated: true;
      };
      videoPreview?: {
        href: string;
        templated: true;
      };
      hlsStream?: {
        href: string;
        templated: boolean;
      };
    };
    downloadUrl?: null;
  };
  subjects: [{ id: string; name: string }];
  badges: string[];
  legalRestrictions: string;
  ageRange: { min: number; max: number; label: string };
  rating?: number;
  yourRating?: null;
  bestFor: [{ label: string }];
  createdBy: string;
  promoted: true;
  language: null;
  captionStatus: string;
  attachments: [
    {
      id: string;
      type: string;
      description: string;
      _links: {
        download: {
          href: string;
          templated: boolean;
        };
      };
    },
  ];
  _links: {
    self: {
      href: string;
      templated: boolean;
    };
    logInteraction: {
      href: string;
      templated: boolean;
    };
    addAttachment: {
      href: string;
      templated: boolean;
    };
  };
  channel?: string;
  channelId?: string;
  channelVideoId?: string;
  types?: [{ id: string; name: string }];
}
