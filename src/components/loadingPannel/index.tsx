import { useEffect, useState } from 'react';
import { imgLoading } from '@/assets';
import {
    // FailedIcons,
    LoadingIcons,
    LoadingPannelMessage,
    // PannelMessage,
    PannelContainer,
} from './loadingPannel.styled';

interface Props {
    loadingTimeout: number;
    loaded: boolean;
    message: string;
    trigger?: number;
    timeOutCallback: () => void;
}

function LoadingPannel({
    loaded,
    message,
    trigger,
    loadingTimeout,
    timeOutCallback,
}: Props) {
    // const [timeout, setTimeOutState] = useState(false);
    const [timeinst, setTimeinst] = useState<NodeJS.Timeout>();

    const startTimeOutWork = (): NodeJS.Timeout => {
        const inst = setTimeout(() => {
            // setTimeOutState(true);
            timeOutCallback();
        }, loadingTimeout);

        setTimeinst(inst);
        return inst;
    };

    useEffect(() => {
        if (loaded || trigger) {
            return () => clearTimeout(timeinst);
        }

        const inst = startTimeOutWork();
        return () => clearTimeout(inst);
    }, [loaded, trigger]);

    // loading Pannel
    return (
        <PannelContainer>
            <LoadingIcons src={imgLoading} />
            <LoadingPannelMessage>{message} </LoadingPannelMessage>
        </PannelContainer>
    );
}

export default LoadingPannel;
