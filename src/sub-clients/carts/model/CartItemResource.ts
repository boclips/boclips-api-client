export interface CartItemResource {
  videoId: string;
  id: string;
  additionalServices: AdditionalServicesResource;
  _links: any;
}

export interface AdditionalServicesResource {
  trim: {
    from: string;
    to: string;
  };
  captionsRequested: boolean;
  transcriptRequested: boolean;
  editRequest?: string;
}
