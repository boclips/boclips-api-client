import { BoclipsApiClient } from './BoclipsApiClient';
import { TestContentPartnersController } from './controllers/content_partners/TestContentPartnersController';
import { TestLegalRestrictionsController } from './controllers/legal_restrictions/TestLegalRestrictionsController';

export class TestBoclipsApiClient implements BoclipsApiClient {
  public legalRestrictionsController: TestLegalRestrictionsController = new TestLegalRestrictionsController();
  public contentPartnersController: TestContentPartnersController = new TestContentPartnersController();
}
