import { Pact } from '@pact-foundation/pact';
import { resolve } from 'path';

const port = 8989;

export const provider = new Pact({
  port,
  log: resolve(process.cwd(), 'logs', 'mockserver-integration.log'),
  dir: resolve(process.cwd(), 'pacts'),
  spec: 2,
  cors: true,
  pactfileWriteMode: 'overwrite',
  consumer: 'boclips-api-client',
  provider: 'gateway',
});
