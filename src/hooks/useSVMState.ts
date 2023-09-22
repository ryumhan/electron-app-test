import { useEffect, useRef, useState } from 'react';

import constants from '@/utils/constants';
import { useTargetOru } from './useTargetOruContext';
import utils from '@/utils';

const { SVM_STATE_INSPECTION_LIST, INSPECTION_STEP } = constants;

type ReturnType = [
    boolean,
    React.RefObject<HTMLIFrameElement>,
    string,
    () => void,
    () => void,
    () => void,
];

const useSVMState = (): ReturnType => {
    const { oruIp } = useTargetOru();
    const [step, setStep] = useState(-1);
    const [inspectionStep, setInspectionStep] = useState(0);

    const [inspectTitle, setInspectTitle] = useState(INSPECTION_STEP[0].name);
    const svmElement = useRef<HTMLIFrameElement>(null);

    const timeOutCallback = () => {
        setStep(-1);
        if (svmElement.current) svmElement.current.src = '';
    };

    const onLoadCallback = () => {
        setStep(0);
    };

    const onSuccessCallback = () => {
        if (!svmElement.current) return;

        const message = SVM_STATE_INSPECTION_LIST[step];
        svmElement.current.contentWindow?.postMessage(
            message,
            utils.getHttpPage(oruIp, ''),
        );

        setStep(step + 1);
    };

    useEffect(() => {
        if (step > -1) setInspectTitle(INSPECTION_STEP[step].name);
    }, [step]);

    return [
        step > -1,
        svmElement,
        inspectTitle,
        onLoadCallback,
        onSuccessCallback,
        timeOutCallback,
    ];
};

export default useSVMState;
