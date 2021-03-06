import { Link } from '../../common/model/LinkEntity';
import { AdditionalServices } from './AdditionalServices';

export interface CartItem {
  id: string;
  videoId: string;
  additionalServices?: AdditionalServices | null;
  links: { self: Link; additionalServices: Link };
}
