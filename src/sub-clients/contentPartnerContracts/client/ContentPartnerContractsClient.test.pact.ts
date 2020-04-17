import { ApiBoclipsClient } from '../../../ApiBoclipsClient';
import { provider } from '../../../pact-support/pactSetup';
import { withClients } from '../../../pact-support/pactTestWrapper';
import { FakeBoclipsClient, isATestClient } from '../../../test-support';
import { ContentPartnerContractFactory } from '../../../test-support/ContentPartnerContractsFactory';
import {
  existingContentPartnerContractFromStaging,
  getContentPartnerContractInteraction,
  getContentPartnerContractsInteraction,
  getSignedLink,
  updateContentPartnerContract,
} from '../pact/ContentPartnerContractsInteractions';
import moment = require('moment');

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
          client.contentPartnerContracts.insertContentPartnerContractFixture(
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
        const contract = await client.contentPartnerContracts.get(
          existingContentPartnerContractFromStaging,
        );

        expect(contract.id).toEqual(existingContentPartnerContractFromStaging);
        expect(contract.contentPartnerName).toEqual(
          sampleContract.contentPartnerName,
        );
        expect(contract.contractDocument).toEqual(
          sampleContract.contractDocument,
        );
        expect(contract.contractDates?.start).toEqual(
          sampleContract.contractDates.start,
        );
        expect(contract.contractDates?.end).toEqual(
          sampleContract.contractDates.end,
        );
        expect(contract.contractIsRolling).toEqual(
          sampleContract.contractIsRolling,
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
        expect(contract.restrictions?.clientFacing).toEqual(
          sampleContract.restrictions.clientFacing,
        );
        expect(contract.restrictions?.companies).toEqual(
          sampleContract.restrictions.companies,
        );
        expect(contract.restrictions?.editing).toEqual(
          sampleContract.restrictions.editing,
        );
        expect(contract.restrictions?.licensing).toEqual(
          sampleContract.restrictions.licensing,
        );
        expect(contract.restrictions?.marketing).toEqual(
          sampleContract.restrictions.marketing,
        );
        expect(contract.restrictions?.other).toEqual(
          sampleContract.restrictions.other,
        );
        expect(contract.restrictions?.payout).toEqual(
          sampleContract.restrictions.payout,
        );
        expect(contract.restrictions?.territory).toEqual(
          sampleContract.restrictions.territory,
        );
        expect(contract.costs?.minimumGuarantee).toEqual(
          sampleContract.costs.minimumGuarantee,
        );
        expect(contract.costs?.upfrontLicense).toEqual(
          sampleContract.costs.upfrontLicense,
        );
        expect(contract.costs?.technicalFee).toEqual(
          sampleContract.costs.technicalFee,
        );
        expect(contract.costs?.recoupable).toEqual(
          sampleContract.costs.recoupable,
        );
      });

      it('can fetch all contracts', async () => {
        const pageRequest = {
          page: 0,
          size: 1,
        };
        await provider.addInteraction(
          getContentPartnerContractsInteraction(pageRequest),
        );

        const contracts = await client.contentPartnerContracts.getAll(
          pageRequest,
        );

        expect(contracts.page).toHaveLength(1);
        expect(contracts.pageSpec.size).toEqual(1);
        expect(contracts.pageSpec.number).toEqual(0);
      });

      it('can fetch signed link', async () => {
        const filename = 'file.png';
        await provider.addInteraction(getSignedLink(filename));

        const signedLink = await client.contentPartnerContracts.getSignedLink(
          filename,
        );

        expect(typeof signedLink).toEqual('string');
      });

      it('can update contract', async () => {
        await provider.addInteraction(
          updateContentPartnerContract(
            existingContentPartnerContractFromStaging,
          ),
        );

        await client.contentPartnerContracts.update(
          existingContentPartnerContractFromStaging,
          {
            contentPartnerName: 'new name',
            contractDates: {
              start: moment('2012-01-31'),
              end: moment('2012-02-01'),
            },
          },
        );
      });
    },
  );
});
