export default interface CollectionFilter {
  query?: string;
  page?: number;
  size?: number;
  projection?: string;
  discoverable?: boolean;
  ignore_discoverable?: boolean;
}
