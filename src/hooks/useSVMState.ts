import { useEffect, useRef, useState } from 'react';

import constants from '@/utils/constants';
import { useTargetOru } from './useTargetOruContext';
import utils from '@/utils';

const { SVM_STATE_INSPECTION_LIST, INSPECTION_STEP } = constants;

type ReturnType = [
    boolean,
    React.RefObject<HTMLIFrameElement>,
    string,
    string[],
    () => void,
    () => void,
    () => void,
];

interface Props {
    completeStepCallback: (value: boolean) => void;
}

const useSVMState = ({ completeStepCallback }: Props): ReturnType => {
    const { oruIp } = useTargetOru();

    const [inspectionStep, setInspectionStep] = useState(-1);

    const [checkStep, setCheckStep] = useState(0);
    const [checkList, setCheckList] = useState<string[]>(
        INSPECTION_STEP[0].checkList,
    );

    const [inspectTitle, setInspectTitle] = useState(INSPECTION_STEP[0].name);
    const svmElement = useRef<HTMLIFrameElement>(null);

    const timeOutCallback = () => {
        setInspectionStep(-1);
    };

    const onLoadCallback = () => {
        setInspectionStep(0);
    };

    const onSuccessCallback = () => {
        if (!svmElement.current || inspectionStep < 0) return;

        if (INSPECTION_STEP[inspectionStep].name === 'CallSVM') {
            const message = SVM_STATE_INSPECTION_LIST[checkStep];
            svmElement.current.contentWindow?.postMessage(
                message,
                utils.getHttpPage(oruIp, ''),
            );

            checkStep === SVM_STATE_INSPECTION_LIST.length
                ? setInspectionStep(inspectionStep + 1)
                : setCheckStep(checkStep + 1);
        } else if (inspectionStep + 1 === INSPECTION_STEP.length) {
            completeStepCallback(true);
        } else {
            setInspectionStep(inspectionStep + 1);
        }
    };

    useEffect(() => {
        if (inspectionStep < 0) return;

        setInspectTitle(INSPECTION_STEP[inspectionStep].name);
        setCheckList(INSPECTION_STEP[inspectionStep].checkList);
    }, [inspectionStep]);

    return [
        inspectionStep > -1,
        svmElement,
        inspectTitle,
        checkList,
        onLoadCallback,
        onSuccessCallback,
        timeOutCallback,
    ];
};

export default useSVMState;
