import { ContentPartnersController } from './controllers/contentPartners/ContentPartnersController';
import { FeedsController } from './controllers/httpFeeds/FeedsController';
import { LegalRestrictionsController } from './controllers/legalRestrictions/LegalRestrictionsController';
import { SubjectsController } from './controllers/subjects/SubjectsController';

export interface BoclipsApiClient {
  legalRestrictionsController: LegalRestrictionsController;
  contentPartnersController: ContentPartnersController;
  subjectsController: SubjectsController;
  feedsController: FeedsController;
}
