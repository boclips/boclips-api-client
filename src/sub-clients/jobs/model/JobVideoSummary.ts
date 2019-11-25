import { JobStatus } from './JobStatus';
export interface JobVideoSummary {
  id: string;
  title: string;
  status: JobStatus;
  errors: string[];
}
