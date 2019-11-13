export interface OrderItemUpdateRequest {
  price?: number;
  license?: {
    duration: string;
    territory: string;
  };
}
