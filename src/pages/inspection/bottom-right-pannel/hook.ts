import statusAtom from '@/atoms/status.atom';
import useHttpMessage from '@/hooks/useHttpMessage';

import { Diagnostics } from '@/model';
import utils from '@/utils';
import { ipcRenderer } from 'electron';
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
    const oruIp = useRecoilValue(statusAtom.oruIpAtom);
    const setSerial = useSetRecoilState(statusAtom.serialAtom);
    const setVersion = useSetRecoilState(statusAtom.swVersion);
    const setPassword = useSetRecoilState(statusAtom.passwordAtom);

    const { data, loading, timeOutCallback } = useHttpMessage<Diagnostics>({
        url: utils.getAPIUrl(oruIp, 'diagnostics'),
        interval: true,
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

        setVersion(data?.oruInfo.softwareVersion);
        setSerial({
            ccu: data?.ccuInfo.map(ccu => ccu.serialNumber).join('/'),
            customer: data?.oruInfo.serialNumber,
        });
    }, [data]);

    const startQuery = (serial: string) => {
        let targetSerial = serial;
        if (targetSerial.length < 10) {
            ipcRenderer.send('query-asn', { rsn: serial });
            ipcRenderer.on('found-asn', (_, got) => {
                targetSerial = got.asn;
                ipcRenderer.send('query-mac', { asn: targetSerial });
            });

            return;
        }

        ipcRenderer.send('query-mac', { asn: targetSerial });
    };

    useEffect(() => {
        if (!data?.oruInfo.serialNumber) return;
        startQuery(data?.oruInfo.serialNumber);

        ipcRenderer.on('gen-password', (_, got) => {
            setPassword(got.password);
        });
    }, [data?.oruInfo.serialNumber]);

    return [loading || !oruData || !ccuData, oruData, ccuData, timeOutCallback];
};

export default useBottomRightPannelData;
