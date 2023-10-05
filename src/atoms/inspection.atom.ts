import constants from '@/utils/constants';
// import dayjs from 'dayjs';
import { atom } from 'recoil';

interface InspectionData {
    name: string;
    result: boolean;
}

// interface rootReportData {
//     error: string[];
//     date: string;
//     reports: InspectionData[];
// }

const svmReportAtom = atom<InspectionData[]>({
    key: 'svmReportAtom',
    default: constants.SVM_INSPECTION_STEP.map(elem => {
        return { name: elem.name, result: false };
    }),
});

const comReportAtom = atom<InspectionData[]>({
    key: 'comReportAtom',
    default: constants.COM_INSPECTION_STEP.map(elem => {
        return { name: elem.name, result: false };
    }),
});

const failReportAtom = atom<string[]>({
    key: 'failReportAtom',
    default: [],
});

// const rootReporter = atom<rootReportData[]>({
//     key: 'rootReporter',
//     default: [],
// });

// const reportSVMSelector = selector<InspectionData[]>({
//     key: 'reportSVMSelector',
//     get: ({ get }) => {
//         const current = get(rootReporter);
//         return current.length ? current[current.length - 1].reports : [];
//     },
//     set: ({ set, get }, newValue) => {
//         const date = dayjs().toString();

//         const root = get(rootReporter);
//         const current = root.length ? root[root.length - 1].reports : [];

//         const error = get(failReportAtom);
//         // current.concat(current, newValue),

//         // const next: rootReportData = {
//         //     error,
//         //     date,
//         //     reports: newValue,
//         // };

//         // set(rootReporter, next);
//     },
// });

// const reportCOMSelector = selector<InspectionData[]>({
//     key: 'reportCOMSelector',
//     get: ({ get }) => {
//         const current = get(rootReporter);
//         return current.length ? current[current.length - 1].reports : [];
//     },
//     set: ({ set, get }, newValue) => {
//         const date = dayjs().toString();

//         const root = get(rootReporter);
//         const current = root.length ? root[root.length - 1].reports : [];

//         const error = get(failReportAtom);
//                 current.concat(newValue as InspectionData[]),

//         // const next: rootReportData = {
//         //     error,
//         //     date,
//         //     reports: newValue,
//         // };

//         // set(rootReporter, next);
//     },
// });

export default { svmReportAtom, comReportAtom, failReportAtom };
