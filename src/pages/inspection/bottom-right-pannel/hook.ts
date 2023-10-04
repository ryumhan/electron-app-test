import statusAtom from '@/atoms/status.atom';
import useHttpMessage from '@/hooks/useHttpMessage';

import { Diagnostics } from '@/model';
import utils from '@/utils';
import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';

type ReturnType = [
    boolean,
    {
        key: string;
        value: string;
    }[],
    (
        | {
              key: string;
              value: string;
          }[]
        | undefined
    ),
    () => void,
];

const useBottomRightPannelData = (): ReturnType => {
    const oruIp = useRecoilValue(statusAtom.oruIpAtom);

    const { data, loading, timeOutCallback } = useHttpMessage<Diagnostics>({
        url: utils.getAPIUrl(oruIp, 'diagnostics'),
    });

    const oruData = useMemo(
        () => [
            { key: `ORU-Serial`, value: data?.oruInfo.serialNumber || '' },
            {
                key: `ORU-AvikusSerial`,
                value: data?.oruInfo.AvksSerial || '',
            },
        ],
        [data],
    );

    const ccuData = useMemo(
        () =>
            data?.ccuInfo
                .map((ccu, idx) => [
                    { key: `CCU${idx + 1}-Serial`, value: ccu.serialNumber },
                    {
                        key: `CCU${idx + 1}-AvikusSerial`,
                        value: ccu.AvksSerial,
                    },
                ])
                .reduce((prev, next) => prev.concat(prev, next)),
        [data],
    );

    return [loading || !oruData || !ccuData, oruData, ccuData, timeOutCallback];
};

export default useBottomRightPannelData;
