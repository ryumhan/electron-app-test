import { ipcRenderer } from 'electron';
import { useCallback, useEffect, useState } from 'react';
import { webSocketMessage } from '@/model';

interface Props {
    oruIp: string;
}

const useWebSocketClient = ({ oruIp }: Props) => {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState<webSocketMessage>();
    const [timeOver, setTimeOverLimit] = useState(false);
    const [time, setTimePassed] = useState<number>(0);

    const getDataSuccess = useCallback(() => {
        if (time > 1000) setTimeOverLimit(true);
        else setTimeOverLimit(false);

        setTimePassed(0);
    }, [time]);

    const timeOutCallback = () => {
        setOpen(false);
        setTimeOverLimit(true);

        ipcRenderer.send('websocket-module', {
            type: 'close',
            data: oruIp,
        });
    };

    const createWebsocket = () => {
        if (!oruIp) return;

        ipcRenderer.send('websocket-module', {
            type: 'create',
            data: oruIp,
        });

        ipcRenderer.on('websocket-module', (_, got) => {
            if (got.type === 'close') {
                setOpen(false);
                return;
            }

            setData(JSON.parse(got.data));
            setOpen(true);
        });
    };

    useEffect(() => {
        getDataSuccess();
    }, [data]);

    useEffect(() => {
        if (!open) createWebsocket();

        // receive data in interval
        const timeInst = setInterval(() => {
            setTimePassed(current => current + 100);
        }, 100);

        return () => clearInterval(timeInst);
    }, []);

    return { open, data, timeOver, timeOutCallback };
};

export default useWebSocketClient;
