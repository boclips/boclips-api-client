import { ContentPartnerFactory } from '../../test-support';
import { ContentPartnersConverter } from './ContentPartnersConverter';

describe('converting a content partner', () => {
  it('can handle missing ingest details', () => {
    const resource = ContentPartnerFactory.createContentPartnerResource({
      ingest: undefined,
    });

    const contentPartner = ContentPartnersConverter.convertResource(resource);

    expect(contentPartner.ingest).toBeUndefined();
  });
});

describe('converting delivery frequency', () => {
  it('can handle month-based duration', () => {
    const deliveryFrequency = ContentPartnersConverter.convertDeliveryFrequency(
      'P6M',
    );

    expect(deliveryFrequency.asMonths()).toEqual(6);
  });

  it('can handle week-based duration', () => {
    const deliveryFrequency = ContentPartnersConverter.convertDeliveryFrequency(
      'P2W',
    );

    expect(deliveryFrequency.asWeeks()).toEqual(2);
  });

  it('can handle year-based duration', () => {
    const deliveryFrequency = ContentPartnersConverter.convertDeliveryFrequency(
      'P3Y',
    );

    expect(deliveryFrequency.asYears()).toEqual(3);
  });
});

describe('converting ingest details', () => {
  it('can handle manual ingest', () => {
    const ingest = ContentPartnersConverter.convertIngestDetailsResource({
      type: 'MANUAL',
    });

    expect(ingest.type).toEqual('MANUAL');
  });

  it('can handle custom ingest', () => {
    const ingest = ContentPartnersConverter.convertIngestDetailsResource({
      type: 'CUSTOM',
    });

    expect(ingest.type).toEqual('CUSTOM');
  });

  it('can handle mrss feed ingest', () => {
    const ingest = ContentPartnersConverter.convertIngestDetailsResource({
      type: 'MRSS',
      url: 'http://the.feed',
    });

    expect(ingest.type).toEqual('MRSS');
    expect(ingest.url).toEqual('http://the.feed');
  });

  it('can handle youtube scrape ingest', () => {
    const ingest = ContentPartnersConverter.convertIngestDetailsResource({
      type: 'YOUTUBE',
      url: 'http://you.tube',
    });

    expect(ingest.type).toEqual('YOUTUBE');
    expect(ingest.url).toEqual('http://you.tube');
  });
});
