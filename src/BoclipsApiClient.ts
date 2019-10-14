import { ContentPartnersController } from './controllers/content_partners/ContentPartnersController';
import { LegalRestrictionsController } from './controllers/legal_restrictions/LegalRestrictionsController';

export interface BoclipsApiClient {
  legalRestrictionsController: LegalRestrictionsController;
  contentPartnersController: ContentPartnersController;
}
