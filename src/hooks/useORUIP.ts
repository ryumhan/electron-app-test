import { ipcRenderer } from 'electron';
import { useEffect } from 'react';
import utils from '@/utils';
import statusAtom from '@/atoms/status.atom';
import { useRecoilState } from 'recoil';

const useORUIP = (): {
    found: boolean;
    oruIp: string;
    timeOutCallback: () => void;
} => {
    const [ip, setOruIpAtom] = useRecoilState(statusAtom.oruIpAtom);
    const timeOutCallback = () => {
        setOruIpAtom('');
    };

    const findOru = () => {
        if (utils.isTestMode()) {
            setTimeout(() => {
                setOruIpAtom(utils.getTestAddress());
            }, 1000);

            return;
        }

        ipcRenderer.on('oruDiscover-module', (_, { data }) => {
            setOruIpAtom(data);
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
