import constants from '@/utils/constants';
import { atom, selector } from 'recoil';

export type ResultType = 'Failed' | 'Pass' | 'Progressing';

export interface InspectionData {
    name: string;
    result: ResultType;
}

const defaultSvm = constants.SVM_INSPECTION_STEP.map(elem => {
    return { name: elem.name, result: 'Progressing' as ResultType };
});

const defaultCom = constants.COM_INSPECTION_STEP.map(elem => {
    return { name: elem.name, result: 'Progressing' as ResultType };
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

const svmStepSelector = selector<number>({
    key: 'svmStepSelector',
    get: ({ get }) => {
        const svm = get(svmReportAtom);
        const found = svm.findIndex(elem => elem.result === 'Progressing');
        return found === -1 ? svm.length - 1 : found - 1;
    },
});

const statusSelector = selector<ResultType>({
    key: 'statusSelector',
    get: ({ get }) => {
        const svm = get(svmReportAtom);
        const com = get(comReportAtom);

        const svmFault = svm.find(elem => elem.result === 'Failed');
        const comFault = com.find(elem => elem.result === 'Failed');
        if (svmFault || comFault) {
            return 'Failed';
        }

        const result =
            svm.every(elem => elem.result === 'Pass') &&
            com.every(elem => elem.result === 'Pass');

        return result ? 'Pass' : 'Progressing';
    },
});

export default {
    defaultSvm,
    defaultCom,
    comReportAtom,
    failReportAtom,
    svmReportAtom,
    svmStepSelector,
    statusSelector,
};
