import { useEffect, useRef, useState } from 'react';

import constants from '@/utils/constants';
import utils from '@/utils';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import statusAtoms from '@/atoms/status.atom';
import inspectionAtom from '@/atoms/inspection.atom';

const { SVM_STATE_INSPECTION_LIST, SVM_INSPECTION_STEP } = constants;

type ReturnType = [
    boolean,
    React.RefObject<HTMLIFrameElement>,
    string,
    () => void,
    () => void,
    () => void,
];

interface Props {
    completeStepCallback: (value: boolean) => void;
}

const useSVMState = ({ completeStepCallback }: Props): ReturnType => {
    const oruIp = useRecoilValue(statusAtoms.oruIpAtom);
    const setReport = useSetRecoilState(inspectionAtom.svmReportAtom);

    const [inspectionStep, setInspectionStep] = useState(-1);

    const [checkStep, setCheckStep] = useState(0);
    const [inspectTitle, setInspectTitle] = useState(
        SVM_INSPECTION_STEP[0].name,
    );
    const svmElement = useRef<HTMLIFrameElement>(null);

    const timeOutCallback = () => {
        setInspectionStep(-1);
    };

    const onLoadCallback = () => {
        setInspectionStep(0);
    };

    const onSuccessCallback = () => {
        if (!svmElement.current || inspectionStep < 0) return;

        if (SVM_INSPECTION_STEP[inspectionStep].key === 'CallSVM') {
            const message = SVM_STATE_INSPECTION_LIST[checkStep];
            svmElement.current.contentWindow?.postMessage(
                message,
                utils.getHttpPage(oruIp, ''),
            );

            setCheckStep(checkStep + 1);
        } else if (inspectionStep + 1 === SVM_INSPECTION_STEP.length) {
            completeStepCallback(true);
        }

        setInspectionStep(inspectionStep + 1);
        // save current result
        setReport(current => {
            const newReport = current.map(elem => {
                const rst =
                    elem.name === SVM_INSPECTION_STEP[inspectionStep].name
                        ? {
                              name: elem.name,
                              result: true,
                          }
                        : elem;
                return rst;
            });

            return newReport;
        });
    };

    useEffect(() => {
        if (inspectionStep < 0) return;

        setInspectTitle(SVM_INSPECTION_STEP[inspectionStep].name);
    }, [inspectionStep]);

    return [
        inspectionStep > -1,
        svmElement,
        inspectTitle,
        onLoadCallback,
        onSuccessCallback,
        timeOutCallback,
    ];
};

export default useSVMState;
