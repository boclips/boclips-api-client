import { ContentPartner, Link } from '../types';

export class ContentPartnerFactory {
  public static sample(
    contentPartner: Partial<ContentPartner> = {},
  ): ContentPartner {
    const id = contentPartner.id || '123';
    return {
      id,
      name: contentPartner.name || 'Test name',
      official: contentPartner.official || true,
      ageRange: contentPartner.ageRange || {
        min: 10,
        max: 20,
        label: '10-20',
        ids: ['123'],
      },
      currency: contentPartner.currency || 'USD',
      legalRestriction: contentPartner.legalRestriction || {
        id: '2',
        text: 'a legal restriction',
      },
      links: contentPartner.links || {
        self: new Link({
          href: `/v1/content-partners/${id}`,
        }),
      },
      distributionMethods: contentPartner.distributionMethods || ['STREAM'],
      description: contentPartner.description || 'this is a description',
      language: contentPartner.language || { code: 'spa', name: 'Spanish' },
      contentCategories: contentPartner.contentCategories || [
        { key: 'ANY_KEY', label: 'Any label' },
      ],
      awards: contentPartner.awards || 'Big famous award',
      notes: contentPartner.notes || 'Something noteworthy',
      hubspotId: contentPartner.hubspotId || '666',
      contentTypes: contentPartner.contentTypes || ['NEWS', 'STOCK'],
      oneLineDescription:
        contentPartner.oneLineDescription || '30-year-old mulberry field',
      marketingInformation: contentPartner.marketingInformation || {
        status: 'IN_PROGRESS',
      },
      pedagogyInformation: contentPartner.pedagogyInformation || {
        curriculumAligned: '123',
        educationalResources: '456',
        isTranscriptProvided: true,
        subjects: [
          '5cb499c9fd5beb428189454b',
          '5cb499c9fd5beb428189454d',
          '5cb499c9fd5beb428189454e',
        ],
        bestForTags: [
          '5d3ac0175b3f3b7ba335e104',
          '5d3ac0185b3f3b7ba335e106',
          '5d3ac0185b3f3b7ba335e105',
        ],
        ageRanges: {
          min: 10,
          max: 20,
          label: '10-20',
          ids: ['123'],
        },
      },
    };
  }
}
