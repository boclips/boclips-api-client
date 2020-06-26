import { Link } from '../../common/model/LinkEntity';
import { OrderItem } from './OrderItem';
import { OrderPrice } from './OrderPrice';

export interface Order {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  isbnNumber?: string;
  legacyOrderId: string;
  status: OrderStatus;
  throughPlatform?: boolean;
  totalPrice: OrderPrice;
  userDetails: UserDetails;
  links: {
    self: Link;
  };
  items: OrderItem[];
  transcriptRequested?: boolean;
}

export enum OrderStatus {
  READY,
  IN_PROGRESS,
  INCOMPLETED,
  CANCELLED,
  INVALID,
}

interface UserDetails {
  authorisingUser: string;
  requestingUser: string;
  organisation: string;
}
