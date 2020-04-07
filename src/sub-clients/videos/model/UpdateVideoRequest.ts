export interface UpdateVideoRequest {
  title?: string;
  description?: string;
  promoted?: boolean;
  subjectIds?: string[];
  ageRangeMin?: number;
  ageRangeMax?: number;
}
