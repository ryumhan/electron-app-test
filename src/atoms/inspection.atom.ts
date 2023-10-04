import constants from '@/utils/constants';
import { atom } from 'recoil';

interface InspectionData {
    name: string;
    result: boolean;
}

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

export default { svmReportAtom, comReportAtom };
