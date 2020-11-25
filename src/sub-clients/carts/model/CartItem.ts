import { Link } from '../../common/model/LinkEntity';

export interface CartItem {
  id: string;
  videoId: string;
  links: { self: Link };
}
