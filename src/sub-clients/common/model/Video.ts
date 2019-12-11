import { Subject } from '../../subjects/model/Subject';
import { DistributionMethod } from './DistributionMethod';

export interface VideoLinks {
  update: string | null;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  contentPartner: string;
  disabledDistributionMethods: DistributionMethod[];
  subjects: Subject[];
  links: VideoLinks;
}
