export interface IngestVideoStatusesClient {
  getAll(): Promise<string[]>;
}
