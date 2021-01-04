import { Order } from './Order';

export interface OrdersPage {
  orders: Order[];
  page: ResultsPage;
}

export interface ResultsPage {
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
}
