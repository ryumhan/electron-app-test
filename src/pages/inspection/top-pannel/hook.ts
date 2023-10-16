import useHttpMessage from '@/hooks/useHttpMessage';
import useSVMState from '@/hooks/useSVMState';
import utils from '@/utils';
import { RawAxiosRequestHeaders } from 'axios';
import constants from '@/utils/constants';
import { useState, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import statusAtom from '@/atoms/status.atom';
import inspectionAtom from '@/atoms/inspection.atom';

type ReturnType = [
    boolean,
    string,
    React.RefObject<HTMLIFrameElement>,
    () => void,
    () => void,
    () => void,
    () => void,
    () => void,
];

const useTopPannelData = (): ReturnType => {
    const oruIp = useRecoilValue(statusAtom.oruIpAtom);

    const setFailReport = useSetRecoilState(inspectionAtom.failReportAtom);

    const [pageSrc, setPageSrc] = useState(utils.getHttpPage(oruIp, ''));

    const resetSVMPage = () => {
        setPageSrc(utils.getHttpPage(oruIp, ''));
    };

    const [
        loaded,
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
        method: 'POST' | 'GET';
        body?: { password: string };
        headers?: RawAxiosRequestHeaders;
    }>({
        url: utils.getAPIUrl(oruIp, 'auth'),
        method: 'POST',
        body: { password: constants.PASSWORD },
    });

    const { data, error } = useHttpMessage<{ result: { authtoken: string } }>(
        requestObj,
    );

    const [token, setToken] = useState('');

    useEffect(() => {
        if (data?.result?.authtoken) {
            setRequestObj({
                url: utils.getHttpPage(oruIp, 'calibration'),
                method: 'GET',
                headers: {
                    Authorization: data.result.authtoken,
                    'Content-Type': 'text/html; charset=utf-8',
                },
            });

            setToken(data?.result?.authtoken);
        } else if (inspectTitle === 'Calibration' && !!token) {
            setPageSrc(utils.getHttpPage(oruIp, 'calibration-for-tutorial'));
        }
    }, [data, inspectTitle]);

    useEffect(() => {
        if (error)
            setFailReport(current =>
                current.concat(current, `[Calibration Inspection] ${error}`),
            );
    }, [error]);

    return [
        loaded,
        pageSrc,
        svmElement,
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
