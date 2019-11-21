import { Link } from '../../../types';
import { JobStatus } from './JobStatus';
import { JobSummary } from './JobSummary';

export interface Job {
  id: string;
  status: JobStatus;
  provider: string;
  createdAt: Date;
  videoSummary: JobSummary;
  errors?: string[];
  links: {
    errorsMetadata?: Link;
  };
}
