import { ApiBoclipsClient } from '../../../ApiBoclipsClient';
import { provider } from '../../../pact-support/pactSetup';
import { withClients } from '../../../pact-support/pactTestWrapper';
import { FakeBoclipsClient, isATestClient } from '../../../test-support';
import { Suggestions } from '../model/Suggestions';
import { getSuggestions } from '../pact/SuggestionInteractions';
import { Link } from '../../common/model/LinkEntity';

describe('SuggestionsClient', () => {
  withClients(
    (getClient: () => Promise<FakeBoclipsClient | ApiBoclipsClient>) => {
      let client: FakeBoclipsClient | ApiBoclipsClient;

      beforeEach(async () => {
        client = await getClient();

        if (isATestClient(client)) {
          client.suggestions.populate({
            suggestionTerm: 'ted',
            channels: [
              {
                name: 'Teddy',
                links: {
                  searchVideos: new Link({ href: 'x', templated: true }),
                },
              },
            ],
          });
        }
      });

      it(`can fetch all suggestions `, async () => {
        await provider.addInteraction(getSuggestions());

        const suggestions: Suggestions = await client.suggestions.suggest(
          'ted',
        );

        expect(suggestions.suggestionTerm).toEqual('ted');
        expect(suggestions.channels.length).toBeGreaterThanOrEqual(1);
      });
    },
  );
});
