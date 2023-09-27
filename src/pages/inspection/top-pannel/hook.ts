import useHttpMessage from '@/hooks/useHttpMessage';
import useSVMState from '@/hooks/useSVMState';
import { useTargetOru } from '@/hooks/useTargetOruContext';
import utils from '@/utils';
import { RawAxiosRequestHeaders } from 'axios';
import constants from '@/utils/constants';
import { useState, useEffect } from 'react';

type ReturnType = [
    boolean,
    string,
    string[],
    React.RefObject<HTMLIFrameElement>,
    () => void,
    () => void,
    () => void,
];
interface Props {
    completeStepCallback: (value: boolean) => void;
}

const useTopPannelData = ({ completeStepCallback }: Props): ReturnType => {
    const { oruIp } = useTargetOru();

    const [
        loaded,
        svmElement,
        inspectTitle,
        checkList,
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
        } else if (inspectTitle === 'Calibration' && !!data?.result) {
            setPageSrc(utils.getHttpPage(oruIp, 'calibration-for-tutorial'));
        }
    }, [data, inspectTitle]);

    return [
        loaded,
        pageSrc,
        [inspectTitle, ...checkList],
        svmElement,
        onLoadCallback,
        onSuccessCallback,
        () => {
            timeOutCallback();
            setPageSrc('');
        },
    ];
};

export default useTopPannelData;
