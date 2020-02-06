export interface BoclipsApiError {
  error: string;
  message: string;
  path: string;
  status: number;
  timestamp: Date;
}

export const isBoclipsApiError = (error: any): error is BoclipsApiError => {
  return (
    'error' in error &&
    'message' in error &&
    'path' in error &&
    'status' in error &&
    'timestamp' in error
  );
};
