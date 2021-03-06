import { Link } from '../../common/model/LinkEntity';
import { OrderItem } from './OrderItem';
import { OrderPrice } from './OrderPrice';

export interface Order {
  id: string;
  note?: string;
  createdAt: Date;
  updatedAt: Date;
  isbnNumber?: string;
  searchableOrderId: string;
  status: OrderStatus;
  totalPrice: OrderPrice;
  userDetails: UserDetails;
  links: {
    self: Link;
    update: Link;
  };
  items: OrderItem[];
  captionsRequested?: boolean;
  deliveredAt: Date | null;
}

export enum OrderStatus {
  READY = 'READY',
  IN_PROGRESS = 'IN_PROGRESS',
  INCOMPLETED = 'INCOMPLETED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
  INVALID = 'INVALID',
}

interface UserDetails {
  authorisingUser: string;
  requestingUser: string;
  organisation: string;
}
