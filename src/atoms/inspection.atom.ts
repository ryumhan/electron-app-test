import constants from '@/utils/constants';
import dayjs from 'dayjs';
import { atom, selector } from 'recoil';

interface InspectionData {
    name: string;
    result: boolean;
}

const defaultSvm = constants.SVM_INSPECTION_STEP.map(elem => {
    return { name: elem.name, result: false };
});

const defaultCom = constants.COM_INSPECTION_STEP.map(elem => {
    return { name: elem.name, result: false };
});

const svmReportAtom = atom<InspectionData[]>({
    key: 'svmReportAtom',
    default: defaultSvm,
});

const comReportAtom = atom<InspectionData[]>({
    key: 'comReportAtom',
    default: defaultCom,
});

const failReportAtom = atom<string[]>({
    key: 'failReportAtom',
    default: [],
});

interface rootReportData {
    error: string[];
    last_date: string;
    svmReports: InspectionData[];
    comReports: InspectionData[];
}

const rootReporter = atom<rootReportData[]>({
    key: 'rootReporter',
    default: [
        {
            error: [],
            last_date: '',
            svmReports: defaultSvm,
            comReports: defaultCom,
        },
    ],
});

const svmSelector = selector<InspectionData[]>({
    key: 'svmSelector',
    get: ({ get }) => {
        const current = get(rootReporter);
        return current[current.length - 1].svmReports;
    },
    set: ({ set, get }, newValue) => {
        set(svmReportAtom, newValue);

        const date = dayjs().toString();
        const root = get(rootReporter);

        const currentReport = root[root.length - 1];
        currentReport.last_date = date;
        currentReport.svmReports = newValue as InspectionData[];

        set(rootReporter, root);
    },
});

const comSelector = selector<InspectionData[]>({
    key: 'comSelector',
    get: ({ get }) => {
        const current = get(rootReporter);
        return current[current.length - 1].comReports;
    },
    set: ({ set, get }, newValue) => {
        set(svmReportAtom, newValue);

        const date = dayjs().toString();
        const root = get(rootReporter);

        const currentReport = root[root.length - 1];
        currentReport.last_date = date;
        currentReport.comReports = newValue as InspectionData[];

        set(rootReporter, root);
    },
});

export default {
    rootReporter,
    svmReportAtom,
    defaultSvm,
    defaultCom,
    comReportAtom,
    failReportAtom,
    svmSelector,
    comSelector,
};
