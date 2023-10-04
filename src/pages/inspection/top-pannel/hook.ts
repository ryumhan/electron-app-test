import useHttpMessage from '@/hooks/useHttpMessage';
import useSVMState from '@/hooks/useSVMState';
import utils from '@/utils';
import { RawAxiosRequestHeaders } from 'axios';
import constants from '@/utils/constants';
import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import statusAtom from '@/atoms/status.atom';
import inspectionAtom from '@/atoms/inspection.atom';

type ReturnType = [
    boolean,
    string,
    React.RefObject<HTMLIFrameElement>,
    number,
    () => void,
    () => void,
    () => void,
];
interface Props {
    completeStepCallback: (value: boolean) => void;
}

const useTopPannelData = ({ completeStepCallback }: Props): ReturnType => {
    const oruIp = useRecoilValue(statusAtom.oruIpAtom);
    const inspectionResult = useRecoilValue(inspectionAtom.svmReportAtom);

    const [
        loaded,
        svmElement,
        inspectTitle,
        onLoadCallback,
        onSuccessCallback,
        timeOutCallback,
    ] = useSVMState({ completeStepCallback });

    const [requestObj, setRequestObj] = useState<{
        url: string;
        method: 'POST' | 'GET';
        body?: { password: string };
        headers?: RawAxiosRequestHeaders;
    }>({
        url: '',
        method: 'POST',
    });

    const { data } = useHttpMessage<{ result: { authtoken: string } }>(
        requestObj,
    );

    const [pageSrc, setPageSrc] = useState(utils.getHttpPage(oruIp, ''));
    const [token, setToken] = useState('');

    useEffect(() => {
        if (inspectTitle === 'Calibration' && !data?.result) {
            setRequestObj({
                ...requestObj,
                method: 'POST',
                url: utils.getAPIUrl(oruIp, 'auth'),
                body: { password: constants.PASSWORD },
            });
        } else if (data?.result?.authtoken) {
            setRequestObj({
                url: utils.getHttpPage(oruIp, 'calibration'),
                method: 'GET',
                headers: {
                    Authorization: data.result.authtoken,
                    'Content-Type': 'text/html; charset=utf-8',
                },
            });

            setToken(data.result.authtoken);
        } else if (inspectTitle === 'Calibration' && token) {
            console.log(token);
            setPageSrc(utils.getHttpPage(oruIp, 'calibration-for-tutorial'));
        }
    }, [data, inspectTitle, token]);

    return [
        loaded,
        pageSrc,
        svmElement,
        inspectionResult.findIndex(elem => !elem.result) - 1,
        onLoadCallback,
        onSuccessCallback,
        () => {
            timeOutCallback();
            setPageSrc('');
        },
    ];
};

export default useTopPannelData;
