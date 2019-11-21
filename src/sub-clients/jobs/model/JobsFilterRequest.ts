import { JobStatus } from './JobStatus';

export interface JobsFilterRequest {
  statuses: JobStatus[];
}
