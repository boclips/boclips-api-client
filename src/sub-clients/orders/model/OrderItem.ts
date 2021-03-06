import { Link } from '../../../types';
import { OrderPrice } from './OrderPrice';

export interface OrderItem {
  id: string;
  links: {
    updatePrice: Link;
    update: Link;
  };
  price?: OrderPrice;
  captionsRequested: boolean;
  transcriptRequested?: boolean;
  editRequest?: string;
  video: OrderItemVideo;
  trim?: string;
  channel: OrderItemChannel;
  license?: OrderItemLicense;
}

export interface OrderItemLicense {
  duration: string;
  territory: string;
}

export interface OrderItemChannel {
  id: string;
  name: string;
}

export enum OrderCaptionStatus {
  PROCESSING,
  REQUESTED,
  UNAVAILABLE,
  AVAILABLE,
}

export interface OrderItemVideo {
  id: string;
  types: string[];
  title: string;
  videoReference: string;
  maxResolutionAvailable: boolean;
  captionStatus: OrderCaptionStatus;
  _links: OrderItemVideoLinks;
}

export interface OrderItemVideoLinks {
  fullProjection: Link;
  videoUpload: Link;
  captionAdmin: Link;
}
