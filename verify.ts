import pact from '@pact-foundation/pact-node';
import { VerifierOptions } from '@pact-foundation/pact-node/src/verifier';
import { resolve } from 'path';
import request from 'request-promise-native';

it('Contracts verification', async () => {
  const tokenResponse = await request({
    method: 'POST',
    uri: 'https://api.staging-boclips.com/v1/token',
    form: `grant_type=password&username=${process.env.CONTRACT_TEST_USERNAME}&password=${process.env.CONTRACT_TEST_PASSWORD}&client_id=teachers`,
  });
  const token = JSON.parse(tokenResponse).access_token;
  const opts: VerifierOptions = {
    provider: 'Gateway',
    logLevel: 'debug',
    providerBaseUrl: 'https://api.staging-boclips.com',
    customProviderHeaders: [`authorization: Bearer ${token}`],
    logDir: resolve(process.cwd(), 'logs', `pact.log`),
    pactUrls: [
      resolve(process.cwd(), './pacts/boclips-api-client-gateway.json'),
    ],
  };
  await pact.verifyPacts(opts);
}, 30000);
