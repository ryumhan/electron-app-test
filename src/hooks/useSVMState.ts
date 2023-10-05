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

const useSVMState = (): ReturnType => {
    const setReport = useSetRecoilState(inspectionAtom.svmReportAtom);

    const oruIp = useRecoilValue(statusAtoms.oruIpAtom);

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
        if (
            inspectionStep === -1 ||
            SVM_INSPECTION_STEP[inspectionStep].key !== 'Calibration'
        )
            setInspectionStep(0);
    };

    const onSuccessCallback = () => {
        if (!svmElement.current || inspectionStep < 0) return;

        if (SVM_INSPECTION_STEP[inspectionStep].key !== 'Calibration') {
            const message = SVM_STATE_INSPECTION_LIST[checkStep];
            svmElement.current.contentWindow?.postMessage(
                message,
                utils.getHttpPage(oruIp, ''),
            );

            setCheckStep(checkStep + 1);
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
        if (
            inspectionStep < 0 ||
            inspectionStep >= SVM_INSPECTION_STEP.length ||
            !SVM_INSPECTION_STEP[inspectionStep]
        )
            return;

        setInspectTitle(SVM_INSPECTION_STEP[inspectionStep].key);
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
