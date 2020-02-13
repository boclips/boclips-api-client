import {EduAgeRange} from "../model/EduAgeRange";

export interface EduAgeRangesClient {
    getAll(): Promise<EduAgeRange[]>
}