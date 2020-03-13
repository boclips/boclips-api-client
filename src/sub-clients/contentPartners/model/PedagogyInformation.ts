import { AgeRanges } from '../../common/model/AgeRanges';

export interface PedagogyInformation {
  curriculumAligned: string;
  educationalResources: string;
  isTranscriptProvided: boolean;
  subjects: string[];
  bestForTags: string[];
  ageRanges: AgeRanges;
}
