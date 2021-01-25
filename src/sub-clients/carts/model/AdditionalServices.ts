export interface AdditionalServices {
  trim?: {
    from: string;
    to: string;
  };
  transcriptRequested?: boolean;
  captionsRequested?: boolean;
}
