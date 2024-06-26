import statusAtom from '@/atoms/status.atom';
import useWebSocketClient from '@/hooks/useWebSocketClient';
import { CameraStatus } from '@/model/webSocketMessage/cameraStatus';
import { HearBeat } from '@/model/webSocketMessage/heartbeat';
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
    const { open, data, timeOver, timeOutCallback } = useWebSocketClient({
        oruIp,
    });

    const heartPresentData = useMemo(() => {
        if (data?.method.includes('NotifyHeartBeat')) {
            const heartData = data as HearBeat;
            return [
                {
                    key: 'NotifyHeartBeat(CCU)',
                    value: `${heartData?.params?.CCU}`,
                },
                {
                    key: 'NotifyHeartBeat(ORU)',
                    value: `${heartData?.params?.ORU}`,
                },
            ];
        }
    }, [data]);

    const cameraPresentData = useMemo(() => {
        if (data?.method.includes('NotifyCameraStatus')) {
            const cameraData = data as CameraStatus;
            return cameraData?.params?.inputStatus.camList.map((cam, idx) => {
                return {
                    key: `NotifyCameraStatus(CAM${idx + 1})`,
                    value: cam.status,
                };
            });
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
