import { ApiBoclipsClient } from '../../../ApiBoclipsClient';
import { provider } from '../../../pact-support/pactSetup';
import { withClients } from '../../../pact-support/pactTestWrapper';
import { FakeBoclipsClient, isATestClient } from '../../../test-support';
import { ContentPartnerContractFactory } from '../../../test-support/ContentPartnerContractsFactory';
import {
  existingContentPartnerContractFromStaging,
  getContentPartnerContractInteraction,
} from '../pact/ContentPartnerContractsInteractions';

const sampleContract = ContentPartnerContractFactory.sample({
  id: existingContentPartnerContractFromStaging,
});

describe('ContentPartnerContracts', () => {
  withClients(
    (getClient: () => Promise<FakeBoclipsClient | ApiBoclipsClient>) => {
      let client: FakeBoclipsClient | ApiBoclipsClient;

      beforeEach(async () => {
        client = await getClient();

        if (isATestClient(client)) {
          client.contentPartnerContractsClient.insertContentPartnerContractFixture(
            sampleContract,
          );
        }
      });

      it('can fetch a content partner contract', async () => {
        await provider.addInteraction(
          getContentPartnerContractInteraction(
            existingContentPartnerContractFromStaging,
          ),
        );
        const contract = await client.contentPartnerContractsClient.get(
          existingContentPartnerContractFromStaging,
        );

        expect(contract.id).toEqual(existingContentPartnerContractFromStaging);
        expect(contract.contentPartnerName).toEqual(
          sampleContract.contentPartnerName,
        );
        expect(contract.contractDocument).toEqual(
          sampleContract.contractDocument,
        );
        expect(contract.contractDates.start).toEqual(
          sampleContract.contractDates.start,
        );
        expect(contract.contractDates.end).toEqual(
          sampleContract.contractDates.end,
        );
        expect(contract.daysBeforeTerminationWarning).toEqual(
          sampleContract.daysBeforeTerminationWarning,
        );
        expect(contract.yearsForMaximumLicense).toEqual(
          sampleContract.yearsForMaximumLicense,
        );
        expect(contract.daysForSellOffPeriod).toEqual(
          sampleContract.daysForSellOffPeriod,
        );
        expect(contract.royaltySplit).toEqual(sampleContract.royaltySplit);
        expect(contract.minimumPriceDescription).toEqual(
          sampleContract.minimumPriceDescription,
        );
        expect(contract.remittanceCurrency).toEqual(
          sampleContract.remittanceCurrency,
        );
      });
    },
  );
});
