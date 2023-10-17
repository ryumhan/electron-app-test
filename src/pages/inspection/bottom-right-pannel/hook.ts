import statusAtom from '@/atoms/status.atom';
import useHttpMessage from '@/hooks/useHttpMessage';

import { Diagnostics } from '@/model';
import utils from '@/utils';
import { useEffect, useMemo } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

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
    const setSerial = useSetRecoilState(statusAtom.serialAtom);
    const oruIp = useRecoilValue(statusAtom.oruIpAtom);

    const { data, loading, timeOutCallback } = useHttpMessage<Diagnostics>({
        url: utils.getAPIUrl(oruIp, 'diagnostics'),
    });

    const oruData = useMemo(
        () => [
            { key: 'Sw Version', value: data?.oruInfo.softwareVersion || '' },
            { key: `Customer Serial`, value: data?.oruInfo.serialNumber || '' },
        ],
        [data],
    );

    const ccuData = useMemo(
        () =>
            data?.ccuInfo
                .map((ccu, idx) => [
                    {
                        key: `CCU${idx + 1}-Customer Serial`,
                        value: ccu.serialNumber,
                    },
                ])
                .reduce((prev, next) => prev.concat(next)),
        [data],
    );

    useEffect(() => {
        if (!data?.oruInfo) return;

        setSerial({
            ccu: data?.ccuInfo.map(ccu => ccu.serialNumber).join('/'),
            customer: data?.oruInfo.serialNumber,
        });
    }, [data]);

    return [loading || !oruData || !ccuData, oruData, ccuData, timeOutCallback];
};

export default useBottomRightPannelData;
