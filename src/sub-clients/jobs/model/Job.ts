import { Link } from '../../../types';
import { JobStatus } from './JobStatus';
import { JobSummary } from './JobSummary';
import { JobVideoSummary } from './JobVideoSummary';

export interface Job {
  id: string;
  status: JobStatus;
  provider: string;
  createdAt: Date;
  videoSummary: JobSummary;
  videos: JobVideoSummary[];
  errors?: string[];
  links: {
    errorsMetadata?: Link;
    self: Link;
  };
}
