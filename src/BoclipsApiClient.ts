import { ContentPartnersController } from './controllers/contentPartners/ContentPartnersController';
import { LegalRestrictionsController } from './controllers/legalRestrictions/LegalRestrictionsController';
import { SubjectsController } from './controllers/subjects/SubjectsController';

export interface BoclipsApiClient {
  legalRestrictionsController: LegalRestrictionsController;
  contentPartnersController: ContentPartnersController;
  subjectsController: SubjectsController;
}
