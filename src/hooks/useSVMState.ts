import { useEffect, useRef, useState } from 'react';

import constants from '@/utils/constants';
import utils from '@/utils';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import statusAtoms from '@/atoms/status.atom';
import inspectionAtom, { ResultType } from '@/atoms/inspection.atom';

const {
    INIT_SVM,
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
                    utils.getHttpPage(oruIp, 'v1'),
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
            BACKWARD_SVM_STATE_INSPECTION_LIST[nextCheckStep];

            if (BACKWARD_SVM_STATE_INSPECTION_LIST[nextCheckStep].array) {
                BACKWARD_SVM_STATE_INSPECTION_LIST[
                    nextCheckStep
                ].array?.forEach(
                    msg =>
                        svmElement.current?.contentWindow?.postMessage(
                            msg,
                            utils.getHttpPage(oruIp, 'v1'),
                        ),
                );
            } else {
                const message =
                    BACKWARD_SVM_STATE_INSPECTION_LIST[nextCheckStep];
                svmElement.current.contentWindow?.postMessage(
                    message,
                    utils.getHttpPage(oruIp, 'v1'),
                );
            }

            setCheckStep(nextCheckStep);
        }

        // save current result
        setReport(current => {
            const newReport = current.map(elem => {
                const prevResult: ResultType = 'Progressing';
                const rst =
                    elem.name === SVM_INSPECTION_STEP[currentStep].name
                        ? {
                              name: elem.name,
                              result: prevResult,
                          }
                        : elem;
                return rst;
            });

            return newReport;
        });
    };

    const onButtonSelectCallback = (result: ResultType) => {
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
            if (SVM_STATE_INSPECTION_LIST[nextCheckStep - 1].array) {
                SVM_STATE_INSPECTION_LIST[nextCheckStep - 1].array?.forEach(
                    msg =>
                        svmElement.current?.contentWindow?.postMessage(
                            msg,
                            utils.getHttpPage(oruIp, 'v1'),
                        ),
                );
            } else {
                const message = SVM_STATE_INSPECTION_LIST[nextCheckStep - 1];
                svmElement.current.contentWindow?.postMessage(
                    message,
                    utils.getHttpPage(oruIp, 'v1'),
                );
            }

            setCheckStep(nextCheckStep);
        }

        // save current result
        setReport(current => {
            const newReport = current.map(elem => {
                const rst =
                    elem.name === SVM_INSPECTION_STEP[nextStep].name
                        ? {
                              name: elem.name,
                              result,
                          }
                        : elem;
                return rst;
            });

            return newReport;
        });
    };

    const onSuccessCallback = () => onButtonSelectCallback('Pass');

    const onFailedCallback = () => onButtonSelectCallback('Failed');

    const callInitSVM = () => {
        const interval = setInterval(() => {
            if (svmElement.current) {
                svmElement.current?.contentWindow?.postMessage(
                    INIT_SVM,
                    utils.getHttpPage(oruIp, 'v1'),
                );

                clearInterval(interval);
            }
        }, 300);
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

    useEffect(() => {
        if (loaded) callInitSVM();
    }, [loaded]);
    return [
        loaded,
        svmElement,
        inspectTitle,
        onLoadCallback,
        onBackCallback,
        onSuccessCallback,
        onFailedCallback,
        timeOutCallback,
    ];
};

export default useSVMState;
