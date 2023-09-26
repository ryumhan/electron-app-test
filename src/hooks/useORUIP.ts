import { ipcRenderer } from 'electron';
import { useEffect, useState } from 'react';
import utils from '@/utils';

const useORUIP = (): {
    found: boolean;
    oruIp: string;
    timeOutCallback: () => void;
} => {
    const [ip, setOruIp] = useState('');

    const timeOutCallback = () => {
        setOruIp('');
    };

    const findOru = () => {
        if (utils.isTestMode()) {
            setTimeout(() => {
                setOruIp(utils.getTestAddress());
            }, 5000);

            return;
        }

        ipcRenderer.on('oruDiscover-module', (_, { data }) => {
            setOruIp(data);
        });
    };

    useEffect(() => {
        if (ip)
            ipcRenderer.send('oruDiscover-module', {
                data: ip,
            });
    }, [ip]);
    useEffect(() => {
        findOru();
    }, []);

    return { found: !!ip, oruIp: ip, timeOutCallback };
};

export default useORUIP;
