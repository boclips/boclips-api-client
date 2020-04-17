import rimraf from 'rimraf';
import { provider } from './pactSetup';

export default async () => rimraf.sync(provider.opts.dir!);
