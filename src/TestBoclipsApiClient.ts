import { BoclipsApiClient } from './BoclipsApiClient';
import { TestLegalRestrictionsController } from './controllers/legal_restrictions/TestLegalRestrictionsController';

export class TestBoclipsApiClient implements BoclipsApiClient {
  public legalRestrictionsController: TestLegalRestrictionsController = new TestLegalRestrictionsController();
}
