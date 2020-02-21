import { AgeRange } from '../../common/model/AgeRange';

export interface PedagogyInformation {
  curriculumAligned: string;
  educationalResources: string;
  isTranscriptProvided: boolean;
  subjects: string[];
  bestForTags: string[];
  ageRanges: AgeRange;
}
