import { webSocketMessage } from '@/model';
import { ipcRenderer } from 'electron';
import { useEffect, useState } from 'react';
import { CameraStatus } from '@/model/webSocketMessage/cameraStatus';
import { HearBeat } from '@/model/webSocketMessage/heartbeat';

interface Props {
    oruIp: string;
}

const useWebSocketClient = ({ oruIp }: Props) => {
    const [open, setOpen] = useState(false);
    const [cameraData, setCameraData] = useState<CameraStatus | null>();
    const [heartBeatData, setHeartBeatData] = useState<HearBeat | null>();
    const [trigger, setTrigger] = useState<number>(0);

    const [timeOver, setTimeOverLimit] = useState(false);

    const createWebsocket = () => {
        if (!oruIp) return;

        ipcRenderer.send('websocket-module', {
            type: 'create',
            data: oruIp,
        });

        ipcRenderer.on('websocket-module', (_, got) => {
            setOpen(true);

            const data = JSON.parse(got.data) as webSocketMessage;
            if (data?.method.includes('NotifyHeartBeat')) {
                setHeartBeatData(data as HearBeat);
            } else if (data?.method.includes('NotifyCameraStatus')) {
                setCameraData(data as CameraStatus);
            } else {
                setHeartBeatData(null);
                setCameraData(null);
            }
        });
    };

    const timeOutCallback = () => {
        setOpen(false);
        setTimeOverLimit(true);
        setTrigger(state => state + 1);

        if (!oruIp) return;
        window.location.reload();
    };

    useEffect(() => {
        if (!open) createWebsocket();
    }, []);

    useEffect(() => {
        const time = setTimeout(() => {
            setHeartBeatData(null);
        }, 500);
        return () => clearTimeout(time);
    }, [heartBeatData]);

    useEffect(() => {
        const time = setTimeout(() => {
            setCameraData(null);
        }, 500);
        return () => clearTimeout(time);
    }, [cameraData]);

    return {
        open,
        trigger,
        cameraData,
        heartBeatData,
        timeOver,
        timeOutCallback,
    };
};

export default useWebSocketClient;
