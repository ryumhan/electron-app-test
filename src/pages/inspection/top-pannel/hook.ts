import useHttpMessage from '@/hooks/useHttpMessage';
import useSVMState from '@/hooks/useSVMState';
import utils from '@/utils';
import { RawAxiosRequestHeaders } from 'axios';

import { useState, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import statusAtom from '@/atoms/status.atom';
import inspectionAtom from '@/atoms/inspection.atom';

type ReturnType = [
    boolean,
    number,
    string,
    React.RefObject<HTMLIFrameElement>,
    boolean,
    () => void,
    () => void,
    () => void,
    () => void,
    () => void,
    () => void,
];

const useTopPannelData = (): ReturnType => {
    const oruIp = useRecoilValue(statusAtom.oruIpAtom);
    const password = useRecoilValue(statusAtom.passwordAtom);

    const setFailReport = useSetRecoilState(inspectionAtom.failReportAtom);

    const [fullScreen, setFullscreen] = useState(false);
    const [pageSrc, setPageSrc] = useState(utils.getHttpPage(oruIp, 'v1'));

    const resetSVMPage = () => {
        setPageSrc(utils.getHttpPage(oruIp, 'v1'));
    };

    const [
        loaded,
        trigger,
        svmElement,
        inspectTitle,
        onLoadCallback,
        onBackCallback,
        onSuccessCallback,
        onFailedCallback,
        timeOutCallback,
    ] = useSVMState({
        setPageSrcCallback: resetSVMPage,
    });

    const [requestObj, setRequestObj] = useState<{
        url: string;
        method?: 'POST' | 'GET';
        body?: { password: string };
        headers?: RawAxiosRequestHeaders;
    }>({ url: '' });

    const { data, error } = useHttpMessage<{ result: { authtoken: string } }>(
        requestObj,
    );

    useEffect(() => {
        if (!password) return;

        setRequestObj({
            url: utils.getAPIUrl(oruIp, 'auth'),
            method: 'POST',
            body: { password },
        });
    }, [password]);

    useEffect(() => {
        if (data?.result?.authtoken) {
            setRequestObj({
                url: utils.getHttpPage(oruIp, 'v1/calibration'),
                method: 'GET',
                headers: {
                    Authorization: data.result.authtoken,
                    'Content-Type': 'text/html; charset=utf-8',
                },
            });
        }
    }, [data]);

    useEffect(() => {
        const isCalibrationStep = inspectTitle === 'Calibration';
        if (!isCalibrationStep) return;

        if (!error) {
            setPageSrc(utils.getHttpPage(oruIp, 'calibration-for-tutorial'));
            return;
        }

        setPageSrc(utils.getHttpPage(oruIp, 'failed'));
        setFailReport(current =>
            current.concat(current, `[Calibration Inspection] ${error}`),
        );
    }, [error, inspectTitle]);

    return [
        loaded,
        trigger,
        pageSrc,
        svmElement,
        fullScreen,
        () => setFullscreen(!fullScreen),
        onLoadCallback,
        onBackCallback,
        onSuccessCallback,
        onFailedCallback,
        () => {
            timeOutCallback();
            setPageSrc('');
        },
    ];
};

export default useTopPannelData;
