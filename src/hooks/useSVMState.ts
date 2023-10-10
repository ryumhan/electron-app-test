import { useEffect, useRef, useState } from 'react';

import constants from '@/utils/constants';
import utils from '@/utils';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import statusAtoms from '@/atoms/status.atom';
import inspectionAtom from '@/atoms/inspection.atom';

const {
    SVM_STATE_INSPECTION_LIST,
    BACKWARD_SVM_STATE_INSPECTION_LIST,
    RESET_SVM_STATE_INSPECTION_LIST,
    SVM_INSPECTION_STEP,
} = constants;

type ReturnType = [
    boolean,
    React.RefObject<HTMLIFrameElement>,
    string,
    () => void,
    () => void,
    () => void,
    () => void,
];

interface Props {
    setPageSrcCallback: () => void;
}

const useSVMState = ({ setPageSrcCallback }: Props): ReturnType => {
    const setReport = useSetRecoilState(inspectionAtom.svmReportAtom);

    const oruIp = useRecoilValue(statusAtoms.oruIpAtom);
    const inspectionStep = useRecoilValue(inspectionAtom.svmStepSelector);
    const [loaded, setLoaded] = useState(false);

    const [checkStep, setCheckStep] = useState(0);

    const [inspectTitle, setInspectTitle] = useState(
        SVM_INSPECTION_STEP[0].name,
    );
    const svmElement = useRef<HTMLIFrameElement>(null);

    const timeOutCallback = () => {
        setLoaded(false);
    };

    const onLoadCallback = () => {
        if (
            inspectionStep !== SVM_INSPECTION_STEP.length - 1 &&
            inspectionStep !== -1 &&
            svmElement
        ) {
            RESET_SVM_STATE_INSPECTION_LIST.forEach(msg => {
                svmElement.current?.contentWindow?.postMessage(
                    msg,
                    utils.getHttpPage(oruIp, ''),
                );
            });
        }

        setLoaded(true);
    };

    const onBackCallback = () => {
        if (!svmElement.current || inspectionStep < 0) return;

        const currentStep = inspectionStep;
        if (currentStep === SVM_INSPECTION_STEP.length - 2) {
            setPageSrcCallback();
        }

        if (inspectTitle !== 'Calibration') {
            const nextCheckStep = checkStep - 1;
            const message = BACKWARD_SVM_STATE_INSPECTION_LIST[nextCheckStep];
            svmElement.current.contentWindow?.postMessage(
                message,
                utils.getHttpPage(oruIp, ''),
            );

            setCheckStep(nextCheckStep);
        }

        // save current result
        setReport(current => {
            const newReport = current.map(elem => {
                const rst =
                    elem.name === SVM_INSPECTION_STEP[currentStep].name
                        ? {
                              name: elem.name,
                              result: false,
                          }
                        : elem;
                return rst;
            });

            return newReport;
        });
    };

    const onSuccessCallback = () => {
        const nextStep = inspectionStep + 1;
        const nextCheckStep = checkStep + 1;

        if (
            !svmElement.current ||
            nextStep < 0 ||
            nextStep > SVM_STATE_INSPECTION_LIST.length + 1
        )
            return;

        if (
            nextStep === 0 ||
            (nextStep <= SVM_STATE_INSPECTION_LIST.length &&
                SVM_INSPECTION_STEP[nextStep + 1].key !== 'Calibration')
        ) {
            const message = SVM_STATE_INSPECTION_LIST[nextCheckStep - 1];
            svmElement.current.contentWindow?.postMessage(
                message,
                utils.getHttpPage(oruIp, ''),
            );

            setCheckStep(nextCheckStep);
        }

        console.log(nextCheckStep);
        // save current result
        setReport(current => {
            const newReport = current.map(elem => {
                const rst =
                    elem.name === SVM_INSPECTION_STEP[nextStep].name
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
        if (
            inspectionStep < 0 ||
            inspectionStep >= SVM_INSPECTION_STEP.length ||
            !SVM_INSPECTION_STEP[inspectionStep + 1]
        )
            return;

        setInspectTitle(SVM_INSPECTION_STEP[inspectionStep + 1].key);
    }, [inspectionStep]);

    return [
        loaded,
        svmElement,
        inspectTitle,
        onLoadCallback,
        onBackCallback,
        onSuccessCallback,
        timeOutCallback,
    ];
};

export default useSVMState;
