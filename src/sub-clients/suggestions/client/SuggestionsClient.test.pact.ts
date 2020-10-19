import { ApiBoclipsClient } from '../../../ApiBoclipsClient';
import { provider } from '../../../pact-support/pactSetup';
import { withClients } from '../../../pact-support/pactTestWrapper';
import { FakeBoclipsClient, isATestClient } from '../../../test-support';
import { Suggestions } from '../model/Suggestions';
import { getSuggestions } from '../pact/SuggestionInteractions';

describe('SuggestionsClient', () => {
  withClients(
    (getClient: () => Promise<FakeBoclipsClient | ApiBoclipsClient>) => {
      let client: FakeBoclipsClient | ApiBoclipsClient;

      beforeEach(async () => {
        client = await getClient();

        if (isATestClient(client)) {
          client.suggestions.populate({
            suggestionTerm: 'his',
            channels: [
              {
                id: 'channel-id',
                name: 'The History Channel',
              },
            ],
            subjects: [
              {
                id: 'subject-id',
                name: 'Art History',
              },
            ],
          });
        }
      });

      it(`can fetch all suggestions `, async () => {
        await provider.addInteraction(getSuggestions());

        const suggestions: Suggestions = await client.suggestions.suggest(
          'his',
        );

        expect(suggestions.suggestionTerm).toEqual('his');
        expect(suggestions.channels.length).toBeGreaterThanOrEqual(1);
        expect(suggestions.channels[0].id).toEqual('channel-id');
        expect(suggestions.subjects.length).toBeGreaterThanOrEqual(1);
      });
    },
  );
});
