import { Link } from '../../../types';
import { OrderPrice } from './OrderPrice';

export interface OrderItem {
  id: string;
  links: {
    updatePrice: Link;
    update: Link;
  };
  price?: OrderPrice;
  transcriptRequested: boolean;
  video: OrderItemVideo;
  trim?: string;
  contentPartner: OrderItemContentPartner;
  license?: OrderItemLicense;
}

export interface OrderItemLicense {
  duration: string;
  territory: string;
}

export interface OrderItemContentPartner {
  id: string;
  name: string;
}

export interface OrderItemVideo {
  id: string;
  type: string;
  title: string;
  videoReference: string;
  _links: {
    fullProjection: Link;
  };
}
