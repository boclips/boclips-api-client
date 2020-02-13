import {Clearable} from '../../common/utils/Clearable';
import {EduAgeRange} from '../model/EduAgeRange';
import {EduAgeRangesClient} from './EduAgeRangesClient';

export class FakeEduAgeRangesClient
    implements EduAgeRangesClient, Clearable {
    private ageRanges: EduAgeRange[] = [
        {
            id: 'early-years',
            label: '3 - 5 Early Years',
            min: 3,
            max: 5,
        },

        {
            id: 'lower-elementary',
            label: '5 - 9 Lower Elementary',
            min: 5,
            max: 9,
        },

        {
            id: 'higher-education',
            label: '16 + Higher Education',
            min: 16,
            max: null,
        },

        {
            id: 'high-school',
            label: '14 + High School',
            min: 14,
            max: null,
        },

        {
            id: 'middle-school',
            label: '11 - 14 Middle School',
            min: 11,
            max: 14,
        },

        {
            id: 'higher-elementary',
            label: '9 - 11 Higher Elementary',
            min: 9,
            max: 11,
        },
    ];

    public getAll(): Promise<EduAgeRange[]> {
        return Promise.resolve(this.ageRanges);
    }

    public clear() {
        this.ageRanges = [];
    }
}
