export interface OrderItemUpdateRequest {
  price?: string;
  license?: {
    duration: string;
    territory: string;
  };
}
