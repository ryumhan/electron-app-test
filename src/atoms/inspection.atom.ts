import constants from '@/utils/constants';
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

const svmStepSelector = selector<number>({
    key: 'svmStepSelector',
    get: ({ get }) => {
        const svm = get(svmReportAtom);
        const found = svm.findIndex(elem => !elem.result);
        return found === -1 ? svm.length - 1 : found - 1;
    },
});

export default {
    svmReportAtom,
    svmStepSelector,
    defaultSvm,
    defaultCom,
    comReportAtom,
    failReportAtom,
};
