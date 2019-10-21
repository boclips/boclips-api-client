import { ContentPartnersController } from './controllers/content_partners/ContentPartnersController';
import { LegalRestrictionsController } from './controllers/legal_restrictions/LegalRestrictionsController';
import { SubjectsController } from './controllers/subjects/SubjectsController';

export interface BoclipsApiClient {
  legalRestrictionsController: LegalRestrictionsController;
  contentPartnersController: ContentPartnersController;
  subjectsController: SubjectsController;
}
