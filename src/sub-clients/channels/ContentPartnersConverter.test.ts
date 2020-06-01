import { ChannelFactory } from '../../test-support';
import { ChannelsConverter } from './ChannelsConverter';
import moment from 'moment';

describe('converting a channel', () => {
  it('converts ingest details', () => {
    const resource = ChannelFactory.createChannelResource({
      ingest: { type: 'MANUAL' },
    });

    const channel = ChannelsConverter.convertResource(resource);

    expect(channel.ingest).toBeDefined();
    expect(channel.ingest?.type).toEqual('MANUAL');
  });

  it('can handle missing ingest details', () => {
    const resource = ChannelFactory.createChannelResource({
      ingest: undefined,
    });

    const channel = ChannelsConverter.convertResource(resource);

    expect(channel.ingest).toBeUndefined();
  });

  it('converts delivery frequency', () => {
    const resource = ChannelFactory.createChannelResource({
      deliveryFrequency: 'P1M',
    });

    const channel = ChannelsConverter.convertResource(resource);

    expect(channel.deliveryFrequency).toEqual(moment.duration(1, 'month'));
  });

  it('can handle missing delivery frequency', () => {
    const resource = ChannelFactory.createChannelResource({
      deliveryFrequency: undefined,
    });

    const channel = ChannelsConverter.convertResource(resource);

    expect(channel.deliveryFrequency).toBeUndefined();
  });
});

describe('converting delivery frequency', () => {
  it('can handle month-based duration', () => {
    const deliveryFrequency = ChannelsConverter.convertDeliveryFrequency('P6M');

    expect(deliveryFrequency.asMonths()).toEqual(6);
  });

  it('can handle week-based duration', () => {
    const deliveryFrequency = ChannelsConverter.convertDeliveryFrequency('P2W');

    expect(deliveryFrequency.asWeeks()).toEqual(2);
  });

  it('can handle year-based duration', () => {
    const deliveryFrequency = ChannelsConverter.convertDeliveryFrequency('P3Y');

    expect(deliveryFrequency.asYears()).toEqual(3);
  });
});

describe('converting ingest details', () => {
  it('can handle manual ingest', () => {
    const ingest = ChannelsConverter.convertIngestDetailsResource({
      type: 'MANUAL',
    });

    expect(ingest.type).toEqual('MANUAL');
  });

  it('can handle custom ingest', () => {
    const ingest = ChannelsConverter.convertIngestDetailsResource({
      type: 'CUSTOM',
    });

    expect(ingest.type).toEqual('CUSTOM');
  });

  it('can handle mrss feed ingest', () => {
    const ingest = ChannelsConverter.convertIngestDetailsResource({
      type: 'MRSS',
      urls: ['http://the.feed'],
    });

    expect(ingest.type).toEqual('MRSS');
    expect(ingest.urls).toEqual(['http://the.feed']);
  });

  it('can handle youtube scrape ingest', () => {
    const ingest = ChannelsConverter.convertIngestDetailsResource({
      type: 'YOUTUBE',
      playlistIds: ['playlist-1'],
    });

    expect(ingest.type).toEqual('YOUTUBE');
    expect(ingest.playlistIds).toEqual(['playlist-1']);
  });
});
