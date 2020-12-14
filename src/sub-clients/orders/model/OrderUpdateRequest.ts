import { OrderStatus } from './Order';

export interface OrderUpdateRequest {
  organisation?: string;
  currency?: string;
  status?: OrderStatus;
}
