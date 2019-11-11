import { Link } from '../../../types';
import { OrderPrice } from './OrderPrice';

export interface OrderItem {
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

interface OrderItemLicense {
  duration: string;
  territory: string;
}

interface OrderItemContentPartner {
  id: string;
  name: string;
}

interface OrderItemVideo {
  id: string;
  type: string;
  title: string;
  videoReference: string;
}
