import { Link } from './LinkEntity';
export default interface PageSpec {
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
  previousPage?: Link;
  nextPage?: Link;
}
