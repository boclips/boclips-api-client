import { Pact } from '@pact-foundation/pact';
import path from 'path';

const port = 8989;

export const provider = new Pact({
  port,
  log: path.resolve(process.cwd(), 'logs', 'mockserver-integration.log'),
  dir: path.resolve(process.cwd(), 'pacts'),
  spec: 2,
  cors: true,
  pactfileWriteMode: 'update',
  consumer: 'boclips-api-client',
  provider: 'gateway',
});
