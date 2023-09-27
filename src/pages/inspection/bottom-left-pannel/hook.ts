import { useTargetOru } from '@/hooks/useTargetOruContext';
import useWebSocketClient from '@/hooks/useWebSocketClient';
import { CameraStatus } from '@/model/webSocketMessage/cameraStatus';
import { HearBeat } from '@/model/webSocketMessage/heartbeat';
import { useMemo } from 'react';

type ReturnType = [
    boolean,
    (
        | {
              key: string;
              value: string;
          }
        | undefined
    ),
    (
        | {
              key: string;
              value: string;
          }
        | undefined
    ),
    boolean,
    () => void,
];

const useBottomLeftData = (): ReturnType => {
    const { oruIp } = useTargetOru();
    const { open, data, timeOver, timeOutCallback } = useWebSocketClient({
        oruIp,
    });

    const heartPresentData = useMemo(() => {
        if (data?.method.includes('NotifyHeartBeat')) {
            const heartData = data as HearBeat;
            return {
                key: 'NotifyHeartBeat',
                value: `ccu-${heartData?.params?.CCU} oru-${heartData?.params?.ORU}`,
            };
        }
    }, [data]);

    const cameraPresentData = useMemo(() => {
        if (data?.method.includes('NotifyCameraStatus')) {
            const cameraData = data as CameraStatus;
            return {
                key: 'NotifyCameraStatus',
                value: `${cameraData?.params?.inputStatus.camList
                    .map((cam, idx) => `cam${idx + 1}: ${cam.status}`)
                    .join('')}`,
            };
        }
    }, [data]);

    return [
        open,
        heartPresentData,
        cameraPresentData,
        timeOver,
        timeOutCallback,
    ];
};

export default useBottomLeftData;
