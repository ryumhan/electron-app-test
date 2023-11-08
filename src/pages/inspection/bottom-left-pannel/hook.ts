import statusAtom from '@/atoms/status.atom';
import useWebSocketClient from '@/hooks/useWebSocketClient';
import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';

type ReturnType = [
    boolean,
    (
        | {
              key: string;
              value: string;
          }[]
        | undefined
    ),
    (
        | {
              key: string;
              value: string;
          }[]
        | undefined
    ),
    boolean,
    () => void,
];

const useBottomLeftData = (): ReturnType => {
    const oruIp = useRecoilValue(statusAtom.oruIpAtom);
    const { open, cameraData, heartBeatData, timeOver, timeOutCallback } =
        useWebSocketClient({
            oruIp,
        });

    const heartPresentData = useMemo(() => {
        if (!heartBeatData) return undefined;

        return [
            {
                key: 'NotifyHeartBeat(CCU)',
                value: `${heartBeatData?.params?.CCU}`,
            },
            {
                key: 'NotifyHeartBeat(ORU)',
                value: `${heartBeatData?.params?.ORU}`,
            },
        ];
    }, [heartBeatData]);

    const cameraPresentData = useMemo(() => {
        return cameraData?.params?.inputStatus.camList.map((cam, idx) => {
            return {
                key: `NotifyCameraStatus(CAM${idx + 1})`,
                value: cam.status,
            };
        });
    }, [cameraData]);

    return [
        open,
        heartPresentData,
        cameraPresentData,
        timeOver,
        timeOutCallback,
    ];
};

export default useBottomLeftData;
